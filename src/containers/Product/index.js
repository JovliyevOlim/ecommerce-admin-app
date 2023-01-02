import React,{useState} from 'react';
import Layout from "../../components/Layout";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import Modal from "../../components/Ui/Modal"
import Input from "../../components/Ui/Input";
import {addCategory, deleteProductById} from "../../action";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../../action";
import './style.css'
import {generatePublicUrl} from "../../urlConfig";

function Product(props) {
    const [show, setShow] = useState(false);
    const [productDetailModal,setProductDetailModal] = useState(false)
    const categories = useSelector(state => state.category)
    const product = useSelector(state => state.product)
    const dispatch =  useDispatch()


    const [name,setName] = useState('')
    const [quantity,setQuantity] = useState('')
    const [price,setPrice] = useState('')
    const [description,setDescription] = useState('')
    const [category,setCategory] = useState('')
    const [productPictures,setProductPictures] = useState([])
    const [productDetails,setProductDetails] = useState(null)



    const handleClose = () =>{
        setShow(false);
    }

    const submitProductForm=()=>{
        const form = new FormData()
        form.append('name',name)
        form.append('quantity',quantity)
        form.append('price',price)
        form.append('description',description)
        form.append('category',category)

        for(let pic of productPictures){
            form.append('productPicture',pic)
        }

        dispatch(addProduct(form))
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const createCategoryList = (categories,options=[])=>{
        for(let category of categories){
            options.push({value:category._id,name:category.name});
            if (category.children.length>0){
                createCategoryList(category.children,options)
            }
        }

        return options;
    }

    const handleProductPictures = (e)=>{
        setProductPictures([
            ...productPictures,e.target.files[0]
        ])
        console.log(productPictures)
    }

    const renderProducts = ()=>{
        return (
            <Table style={{fontSize:'12px'}} responsive="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                {
                    product.products.length > 0 ?
                        product.products.map(product=>
                            <tr key={product._id}>
                                <td>1</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.category?.name}</td>
                                <td>
                                    <button onClick={()=>showProductDetailsModal(product)}>info</button>
                                    <button onClick={()=>{
                                        const payload = {productId:product._id};
                                        dispatch(deleteProductById(payload))
                                    }}>del</button>
                                </td>
                            </tr>
                        ):null
                }

                </tbody>
            </Table>
        )
    }

    const renderAddProductModal = () =>{
        return (
            <Modal show={show} handleClose={handleClose} onSubmit={submitProductForm} modalTitle={'Add New Product'}>
                <Input
                    label={'Product Name'}
                    value={name}
                    placeholder={'Product Name'}
                    onChange={(e)=>setName(e.target.value)}
                />
                <Input
                    label={'Quantity'}
                    value={quantity}
                    placeholder={'Quantity'}
                    onChange={(e)=>setQuantity(e.target.value)}
                />
                <Input
                    label={'Price'}
                    value={price}
                    placeholder={'Price'}
                    onChange={(e)=>setPrice(e.target.value)}
                />
                <Input
                    label={'Description'}
                    value={description}
                    placeholder={'Description'}
                    onChange={(e)=>setDescription(e.target.value)}
                />
                <select className={'form-control'} value={category}
                        onChange={(e)=>setCategory(e.target.value)}>
                    <option>select category</option>
                    {
                        createCategoryList(categories.categories).map(option=>
                            <option key={option.value} value={option.value}>{option.name}</option>
                        )
                    }
                </select>

                {
                    productPictures.length > 0 ?
                        productPictures.map((pic,index)=>
                            <div key={index}>{pic?.name}</div>) : null
                }

                <input type="file" name='productPictures' onChange={handleProductPictures}/>
            </Modal>
        )
    }

    const handleCloseProductDetailsModal = ()=>{
        setProductDetailModal(false)
    }

    const showProductDetailsModal=(product)=>{
            setProductDetails(product)
            setProductDetailModal(true)
    }

    const renderProductDetailsModal=()=>{
        if (!productDetails){
            return null;
        }
        return (
            <Modal show={productDetailModal}
                   handleClose={handleCloseProductDetailsModal}
                   modalTitle={'Product Details'}
                   size='lg'
            >
               <Row>
                   <Col md='6'>
                       <label className={'key'}>Name</label>
                       <p className={'value'}>{productDetails.name}</p>
                   </Col>
                   <Col md='6'>
                       <label className={'key'}>Price</label>
                       <p className={'value'}>{productDetails.price}</p>
                   </Col>
               </Row>
                <Row>
                    <Col md='6'>
                        <label className={'key'}>Quantity</label>
                        <p className={'value'}>{productDetails.quantity}</p>
                    </Col>
                    <Col md='6'>
                        <label className={'key'}>Category</label>
                        <p className={'value'}>{productDetails.category?.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md='12'>
                        <label className={'key'}>Description</label>
                        <p className={'value'}>{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className={'key'}>Product Pictures</label>
                        <div style={{display:'flex',gap:'10px'}}>
                            { productDetails.productPictures.map(picture=>
                                    <div key={picture.img} className={'productImgContainer'}>
                                        <img src={generatePublicUrl(picture.img)}/>
                                    </div>
                                )}
                        </div>
                    </Col>
                </Row>
            </Modal>
        )
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <h3>Products</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>
            {
                renderAddProductModal()
            }
            {renderProductDetailsModal()}
        </Layout>
    );
}

export default Product;