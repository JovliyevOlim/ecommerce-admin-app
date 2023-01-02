import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import Modal from "../../components/Ui/Modal";
import {Col, Container, Row} from "react-bootstrap";
import Input from "../../components/Ui/Input";
import LinearCategoryList from "../../helpers/linearCategory";
import {useDispatch, useSelector} from "react-redux";
import linearCategory from "../../helpers/linearCategory";
import  {createPage} from "../../action";

function NewPage(props) {

    const category = useSelector(state =>state.category)
    const [categories,setCategories] = useState([])
    const dispatch = useDispatch()
    const page = useSelector(state=>state.page)

    useEffect(()=>{
            setCategories(linearCategory(category.categories))

        console.log('cat',categories)
    },[category])

    useEffect(()=>{
            console.log(page)
        if(!page.loading){
            setCreateModal(false)
            setTitle('')
            setCategoryId('')
            setDesc('')
            setBanners([])
            setProducts([])
        }
    },[page])

    const [createModal,setCreateModal] = useState(false);
    const [title,setTitle]= useState('')
    const [desc,setDesc]= useState('')
    const [type,setType] = useState('')
    const [banners,setBanners]= useState([])
    const [products,setProducts]= useState([])
    const [categoryId,setCategoryId] = useState('')

    function onCategoryChange(e){
        const category = categories.find(category=>category.value === e.target.value)
        setCategoryId(e.target.value);
        setType(category.type)
    }

    const handleBannerImages = (e)=>{
        console.log(e);
        setBanners([...banners,e.target.files[0]])
    }

    const handleProductImages = (e)=>{
        console.log(e);
        setProducts([...products,e.target.files[0]])
    }

    function submitPageForm(e){

        if (title === ""){
            alert('Title is required')
            setCreateModal(false)
            return;
        }

        const form = new FormData();
        form.append('title',title)
        form.append('description',desc)
        form.append('category',categoryId)
        form.append('type',type)
        banners.forEach((banner,index)=>{
            form.append('banners',banner)
        })
        products.forEach((product,index)=>{
            form.append('products',product)
        })

       dispatch(createPage(form))
    }

    const renderCreatePageModal = ()=>{
        return (
                <Modal
                show={createModal}
                modalTitle={'Create New Page'}
                handleClose={()=>setCreateModal(false)}
                onSubmit={submitPageForm}
                >
                    <Container>
                        <Row>
                            <Col>
                                {/*<select*/}
                                {/*    className={'form-control form-control-sm'}*/}
                                {/*    value={categoryId}*/}
                                {/*    onChange={onCategoryChange}*/}
                                {/*>*/}
                                {/*    <option value={''}>select category</option>*/}
                                {/*    {*/}
                                {/*        categories.map(cat=>*/}
                                {/*            <option key={cat._id} value={cat._id}>{cat.name}</option>)*/}
                                {/*    }*/}
                                {/*</select>*/}
                                <Input
                                    type={'select'}
                                    value={categoryId}
                                    onChange={onCategoryChange}
                                    options={categories}
                                    placeholder={'select category'}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input
                                    value={title}
                                    onChange={(e)=>setTitle(e.target.value)}
                                    placeholder={'Page title'}
                                    className={'form-control form-control-sm'}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input
                                    value={desc}
                                    onChange={(e)=>setDesc(e.target.value)}
                                    placeholder={'Page desc'}
                                    className={'form-control form-control-sm'}
                                />
                            </Col>
                        </Row>

                        <Row>
                            {
                                banners.length > 0 ?
                                    banners.map((banner,index)=>
                                        <Row key={index}>
                                            <Col>{banner.name}</Col>
                                        </Row>) : null
                            }
                            <Col>
                                <Input
                                    className={'form-control'}
                                    type="file"
                                    name='banners'
                                    onChange={handleBannerImages}
                                />
                            </Col>
                        </Row>

                        <Row>
                            {
                                products.length > 0 ?
                                    products.map((product,index)=>
                                        <Row key={index}>
                                            <Col>{product.name}</Col>
                                        </Row>) : null
                            }
                            <Col>
                                <input
                                    type="file"
                                    name='product'
                                    onChange={handleProductImages}
                                />
                            </Col>
                        </Row>
                    </Container>
                </Modal>
        )
    }


    return (
        <Layout sidebar>
            {
                page.loading ?
                    <p>Creating Page...please wait</p>
                    :
                    <>
                        {renderCreatePageModal()}
                        <button onClick={()=>setCreateModal(true)}>Create Page</button>
                    </>
            }

        </Layout>


    );
}

export default NewPage;
