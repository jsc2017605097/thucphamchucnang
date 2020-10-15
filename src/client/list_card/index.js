import React from 'react'
import Card from '../card'
import { Row, Col } from 'reactstrap'
import { AiFillFolderOpen } from 'react-icons/ai'
import Pagination from '../../components/pagination'
import Search from '../../components/search'
import Alert from '@material-ui/lab/Alert'
import {Link} from 'react-router-dom'
import './index.css'

export default function ListCard({ products, name_category }) {

    let product_to_show = [...products]
    const [search, set_search] = React.useState('')
    const [tranghientai, setTranghientai] = React.useState(1)

    React.useEffect(()=>{
        window.document.title="Khoestore.com"
    },[])

    let sobaiviet1trang = 12
    if (window.screen.width <= 768) {
        sobaiviet1trang = 6
    }
    const tongsobaiviet = product_to_show.length
    const sotrang = Math.ceil(tongsobaiviet / sobaiviet1trang)
    product_to_show = product_to_show.slice(tranghientai * sobaiviet1trang - sobaiviet1trang, tranghientai * sobaiviet1trang)

    if (search) {
        product_to_show = product_to_show.filter(p => p.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
    }

    return (
        <div>
            <div className="chude margin-bottom-10 flex-around">
                <div className="flex-start">
                    <AiFillFolderOpen />&nbsp;
                    <Link to='/'>Trang chủ /</Link>
                    &nbsp;
                    {name_category}
                </div>
            </div>
            <Search setSearch={set_search} />
            <Row>
                {product_to_show.map((p, key) => <Col key={key} xs="12" sm="6" lg="4" xl="3">
                    <Card product={p} />
                </Col>)}
            </Row>
            {product_to_show.length === 0 && <div>
                <Alert severity="error">Nếu không tìm thấy sản phẩm, next trang tiếp theo!</Alert>
            </div>
            }
            <div className='flex'>
                <Pagination sotrang={sotrang} tranghientai={tranghientai} setTranghientai={setTranghientai} />
            </div>
        </div>
    )
}
