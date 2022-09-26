import { Button, Col, Input, Modal, Row, Table, Text } from '@nextui-org/react';
import { useEffect, useMemo, useRef, useState } from 'react'
import { customerApi } from '../../api'
import { CustomerListResponse } from '../../interfaces/customer-list';
import { CustomerModal } from './CustomerModal';

export const CustomerTable = () => {

    const [customerList, setCustomerList] = useState<CustomerListResponse>();
    const [customerError, setCustomerError] = useState<string>();
    const [showTable, setshowTable] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const addCustomer = () => {
        setIsEditMode(false);
        setShowModal(true);
    }

    const editCustomer = (id) => {
        setIsEditMode(true);
        setEditId(id);
        setShowModal(true);
    }

    const customerItems = useMemo(() => customerList?.items, [customerList]);

    const getAll = async (page: number = 1) => {
        setshowTable(false);
        await customerApi.get<CustomerListResponse>(`/Customer?page=${page}`)
            .then(({ data }) => {
                setCustomerList(data);
                setshowTable(true);
            })
            .catch(({ message }) => {
                setCustomerError(message);
            });
    };

    const removeCustomer = async (id: number) => {
        setshowTable(false);
        await customerApi.delete<CustomerListResponse>(`/Customer/${id}`)
            .then(({ data }) => {
                getAll();
                setshowTable(true);
            });
    };

    useEffect(() => {
        getAll();
    }, [])

    const renderCell = (id: number) => {
        return (
            <Row justify="center" align="center">
                <Col css={{ d: "flex" }}>
                    <Button color="primary" bordered onClick={() => editCustomer(id)}>Edit</Button>
                </Col>
                <Col css={{ d: "flex" }}>
                    <Button color="error" bordered onClick={() => removeCustomer(id)}>Remove</Button>
                </Col>
            </Row>
        );

    }


    return (
        <>
            <CustomerModal showModal={showModal} closeModal={() => { setShowModal(false); setEditId(null) }} isEditMode={isEditMode} customerId={editId} getAll={getAll} />
            <h1>Customers</h1>
            <div>
                <Button bordered color="primary" auto shadow onClick={addCustomer}>
                    Add Customer
                </Button>
            </div>

            {showTable &&
                <Table
                    bordered
                    shadow={false}
                    color="secondary"
                    aria-label="Example pagination table"
                    css={{
                        height: "auto",
                        minWidth: "100%",
                    }}
                >
                    <Table.Header>
                        <Table.Column>Id</Table.Column>
                        <Table.Column>Email</Table.Column>
                        <Table.Column>First</Table.Column>
                        <Table.Column>Last</Table.Column>
                        <Table.Column>Company</Table.Column>
                        <Table.Column>Created At</Table.Column>
                        <Table.Column>Country</Table.Column>
                        <Table.Column>Actions</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {
                            customerItems?.map(({ id, email, first, last, company, created_at, country }, idx) => {
                                return (
                                    <Table.Row key={`${id}-${idx}`}>
                                        <Table.Cell>{id}</Table.Cell>
                                        <Table.Cell>{email}</Table.Cell>
                                        <Table.Cell>{first}</Table.Cell>
                                        <Table.Cell>{last}</Table.Cell>
                                        <Table.Cell>{company}</Table.Cell>
                                        <Table.Cell>{created_at.toString()}</Table.Cell>
                                        <Table.Cell>{country}</Table.Cell>
                                        <Table.Cell>{renderCell(id)}</Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>

                    <Table.Pagination
                        color="primary"
                        page={customerList?.paginationInfo.currentPage}
                        total={customerList?.paginationInfo.totalPages}
                        shadow
                        noMargin
                        align="center"
                        rowsPerPage={10}
                        onPageChange={(page) => getAll(page)}
                    />
                </Table>
            }
        </>
    )
}
