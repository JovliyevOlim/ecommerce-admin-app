import React from 'react';
import Modal from "../../../components/Ui/Modal";
import Input from "../../../components/Ui/Input";
import {Col, Row} from "react-bootstrap";

function AddCategoryModal(props) {

    const {
        show,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage,
        onSubmit
    } = props

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
            onSubmit={onSubmit}
        >
            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={'Category Name'}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className={'form-control-sm'}
                    />
                </Col>
                <Col>
                    <select className={'form-control form-control-sm'} value={parentCategoryId}
                            onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>select category</option>
                        {
                            categoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        }
                    </select>
                </Col>

            </Row>
            <Row>
                <Col>
                    <input type="file" name='categoryImage' onChange={handleCategoryImage}/>
                </Col>
            </Row>





        </Modal>
    );
}

export default AddCategoryModal;
