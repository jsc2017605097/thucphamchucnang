import React from 'react'
import DialogAddProduct from './dialog_add_product'
import DialogAddCategory from './dialog_add_category'
import Category from './category'
import Product from './product'
import Logout from './logout'
import Avatar from './avatar'
import Footer from './footer'
import Search from '../components/search'
import { useSelector } from 'react-redux'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import DialogEditProduct from './dialog_edit_product'

export default function Dashboard() {

    // const [search, setSearch] = React.useState('')
    // const match = useRouteMatch('/dashboard/category/:id')
    // const products = useSelector(state => {
    //     if (match) {
    //         return state.product.filter(p => p.category === match.params.id)
    //     }
    //     return state.product
    // })
    // document.title = "VUA ĐỒ GỖ"
    return (
        <div>
            <div className='container'>
                <Avatar />
            </div>
            <div className='flex  margin-bottom-30'>
                <DialogAddProduct />
                <DialogAddCategory />
            </div>

            <div style={{ padding: "10px" }}>
                <Category />
            </div>


            {/* <div className='container'>
                <Switch>
                    <Route path='/dashboard/product/:id'>
                        <DialogEditProduct />
                    </Route>
                    <Route path='/dashboard'>
                        <Search setSearch={setSearch} />
                        <Product search={search} products={products} />
                    </Route>
                </Switch>
            </div> */}
           
           
            <div className='flex container' style={{ justifyContent: "flex-start", paddingTop: "10px" }}>
                <div><Logout /></div>
                &nbsp; ĐĂNG XUẤT
            </div>
            <Footer />
        </div>
    )
}