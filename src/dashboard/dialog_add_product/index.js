import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ButtonFloatingAdd from '../../components/button_float'
import './index.css'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { MdCreate } from 'react-icons/md'
import ButtonDelete from '../../components/button_float'
import { AiFillDelete } from 'react-icons/ai'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
    const categorys = useSelector(state => state.category)
    const dispatch = useDispatch()

    const [images, setImages] = React.useState([])
    const [name, setName] = React.useState('')
    const [description, setdescription] = React.useState('')
    const [price, setPrice] = React.useState(0)
    const [price_old, set_price_old] = React.useState(0)
    const [category, setCategory] = React.useState('')
    const [content, setContent] = React.useState('')

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };


    function handleDeleteImg(link) {
        const newImages = images.filter(img => img !== link)
        setImages(newImages)
    }

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(event) {
        event.preventDefault()
        const link_image = images.map(ob => '/images/' + ob.name)
        const data = {
            name, img: link_image, description, price, category, detail: content, price_old
        }
        handleImage();
        axios({
            method: "post",
            url: '/api/product',
            data: data,
            headers: {
                "Authorization": window.localStorage.getItem("token")
            }
        }).then(res => {
            setImages([])
            setName('')
            setdescription('')
            setPrice('')
            setCategory('')
            setContent('')
            dispatch({ type: "ADD_PRODUCT", data: res.data })
            window.alert("Thêm mới thành công!")
            console.log(res.data)
        }).catch(error => window.alert(error.response.data))

        console.log('submit...')
    }

    function handleImage() {
        const formData = new FormData()
        for (var key in images) {
            formData.append("file" + key, images[key])
        }
        axios({
            method: "post",
            url: "/api/uploads",
            data: formData,
            headers: {
                "Authorization": window.localStorage.getItem("token")
            }
        }).then(res => console.log("Upload image successly!"))
    }

    return (
        <div>
            <div onClick={handleClickOpen} className="flex margin-right-20">
                <ButtonFloatingAdd color='secondary' size="medium" icon={<MdCreate />} /> SẢN PHẨM
            </div>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Thêm mới sản phẩm
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSubmit}>
                            Tạo
                        </Button>
                    </Toolbar>
                </AppBar>
                <Form style={{ padding: "20px" }}>
                    <FormGroup>
                        <Label for="examplePassword">Tên sản phẩm</Label>
                        <Input value={name} required onChange={(event) => setName(event.target.value)} type="text" id="examplePassword" placeholder="Tên sản phẩm" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="file">Ảnh sản phẩm</Label>
                        <Input id='file' onChange={event => setImages([...images, ...event.target.files])} accept="image/*" multiple type="file" name="file" />
                    </FormGroup>
                    <FormGroup>
                        {
                            images.map((img, key) => <div key={key} style={{ margin: "10px 10px 0 0", boxShadow: "0.2px 0.2px 5px", display: "inline-block" }}>
                                <img alt="img" src={URL.createObjectURL(img)} height="100px" />
                                <div className="icon_delete_img">
                                    <ButtonDelete color="secondary" size="small" icon={<AiFillDelete />} onClick={() => handleDeleteImg(img)} />
                                </div>
                            </div>
                            )}
                    </FormGroup>
                    <FormGroup>
                        <Label for="mota">Mô tả ngắn</Label>
                        <Input value={description} onChange={event => setdescription(event.target.value)} type="text" id="mota" placeholder="Mô tả ngắn sản phẩm" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="gia">Giá</Label>
                        <Input value={price} onChange={event => setPrice(event.target.value)} type="text" id="gia" placeholder="VNĐ" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="gia">Giá cũ</Label>
                        <Input value={price_old} onChange={event => set_price_old(event.target.value)} type="text" id="old" placeholder="VNĐ" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Danh mục</Label>
                        <Input value={category} onChange={event => setCategory(event.target.value)} type="select" name="select" id="exampleSelect">
                            <option value={''}>Danh mục</option>
                            {
                                categorys.map(ca => <option key={ca._id} value={ca._id}>{ca.name}</option>)
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Nội dung chi tiết</Label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            config={{
                                ckfinder: {
                                    uploadUrl: '/upload'
                                }
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setContent(data)
                            }}
                        />
                    </FormGroup>
                </Form>
            </Dialog>
        </div>
    );
}