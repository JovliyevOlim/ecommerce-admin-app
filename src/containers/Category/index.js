import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addCategory, getAllCategory, updateCategories, deleteCategories as deleteCategoriesAction} from "../../action";
import Modal from "../../components/Ui/Modal"
import CheckboxTree from "react-checkbox-tree"
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
    IoIosCheckbox,
    IoIosCheckboxOutline,
    IoIosArrowDown,
    IoIosArrowForward,
    IoIosAdd,
    IoIosTrash, IoIosCloudUpload
} from 'react-icons/io'
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";
import './style.css'

function Category(props) {

    const category = useSelector(state => state.category)
    const dispatch = useDispatch();

    const [checked, setChecked] = useState([])
    const [expanded, setExpanded] = useState([])
    const [expandedArray, setExpandedArray] = useState([])
    const [checkedArray, setCheckedArray] = useState([])

    const [show, setShow] = useState(false);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')

    const handleClose = () => {
        const form = new FormData();

        if (categoryName === ""){
            alert('CategoryName is required')
            setShow(false)
            return;
        }

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));

        setCategoryName('')
        setParentCategoryId('')
        setCategoryImage('')

        setShow(false);
    }
    const handleShow = () => setShow(true);


    useEffect(()=>{
            if (!category.loading){
                setShow(false)
            }
    },[category.loading])

    const renderCategories = (categories) => {
        let Mycategories = [];
        for (let category of categories) {
            Mycategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            )
        }
        return Mycategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({value: category._id, name: category.name, parentId: category.parentId,type:category.type});
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

    const updateCategory = () => {
        setUpdateCategoryModal(true)
        updateCheckedAndExpandedCategories()
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories)
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, index) => categoryId == category.value)
            category && checkedArray.push(category)
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, index) => categoryId == category.value)
            category && expandedArray.push(category)
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? {
                ...item,
                [key]: value
            } : item)
            setCheckedArray(updatedCheckedArray)
        } else if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? {
                ...item,
                [key]: value
            } : item)
            setExpandedArray(updatedExpandedArray)
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : '');
            form.append('type', item.type)
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : '');
            form.append('type', item.type)
        });
        dispatch(updateCategories(form))
        setUpdateCategoryModal(false);
    }


    const deleteCategory = () => {
        setDeleteCategoryModal(true)
        updateCheckedAndExpandedCategories()
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({_id: item.value}))
        const expandedIdsArray = expandedArray.map((item, index) => ({_id: item.value}))
        const idsArray = expandedIdsArray.concat(checkedIdsArray);
        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
        }
        setDeleteCategoryModal(false)
    }

    const renderDeleteCategoryModal = () => {
        return (
            <Modal
                modalTitle='Confirm'
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            alert('no');
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}
            >
                <h5>Expanded</h5>
                {
                    expandedArray.map((item, index) =>
                        <span key={index}>{item.name}</span>)
                }
                <h5>Checked</h5>
                {
                    checkedArray.map((item, index) =>
                        <span key={index}>{item.name}</span>)
                }

            </Modal>
        )
    }


    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h3>Category</h3>
                            <div className={'actionBtnContainer'}>
                                <span>Actions:</span>
                                <button onClick={handleShow}><IoIosAdd/> <span> Add</span></button>
                                <button onClick={deleteCategory}><IoIosTrash/> <span> Delete</span> </button>
                                <button onClick={updateCategory}><IoIosCloudUpload/> <span> Edit</span>   </button>
                            </div>

                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {/*<ul>*/}
                        {/*    {renderCategories(category.categories)}*/}
                        {/*    /!*{JSON.stringify(createCategoryList(category.categories))}*!/*/}
                        {/*</ul>*/}
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox/>,
                                uncheck: <IoIosCheckboxOutline/>,
                                halfCheck: <IoIosCheckboxOutline/>,
                                expandClose: <IoIosArrowForward/>,
                                expandOpen: <IoIosArrowDown/>
                            }}
                        />
                    </Col>
                </Row>
            </Container>

            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={()=>setUpdateCategoryModal(false)}
                onSubmit={updateCategoriesForm}
                modalTitle={'Update Categories'}
                size='lg'
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={createCategoryList(category.categories)}
            />

            <AddCategoryModal
                show={show}
                handleClose={()=>setShow(false)}
                onSubmit={handleClose}
                modalTitle={'Add New Categories'}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                categoryList={createCategoryList(category.categories)}
            />


            {renderDeleteCategoryModal()}


        </Layout>
    );
}

export default Category;
