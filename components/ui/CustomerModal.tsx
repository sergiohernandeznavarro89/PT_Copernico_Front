import { Button, Grid, Input, Modal, Text } from '@nextui-org/react'
import axios from 'axios';
import { count } from 'console';
import { FC, useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { customerApi } from '../../api';
import { Customer } from '../../interfaces/customer-list';

interface Props {
    showModal: boolean
    closeModal: () => void
    isEditMode?: boolean
    customerId?: number
    getAll: () => void
}

export const CustomerModal: FC<Props> = ({ showModal, closeModal, isEditMode = false, customerId, getAll }) => {

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [company, setCompany] = useState('');
    const [country, setCountry] = useState('');
    const [disableButton, setDisableButton] = useState(true);

    const formatPostParams = () => {
        let params = {
            "id": id,
            "email": email,
            "first": first,
            "last": last,
            "company": company,
            "country": country
        };

        return params;
    }

    const clearForm = () => {
        setId('');
        setCompany('');
        setCountry('');
        setEmail('');
        setFirst('');
        setLast('');
    }

    const getById = async () => {
        if (customerId) {
            await customerApi.get<Customer>(`/Customer/${customerId}`)
                .then(({ data }) => {
                    setId(data.id.toString());
                    setCompany(data.company);
                    setCountry(data.country);
                    setEmail(data.email);
                    setFirst(data.first);
                    setLast(data.last);
                });
        }
    };

    const isValidForm = () => {
        if (id && email && first && last && company && country) {
            setDisableButton(false);
        }
        else {
            setDisableButton(true);
        }
    }

    useEffect(() => {
        if (isEditMode) {
            getById();
        }
    }, [customerId])



    useEffect(() => {
        isValidForm();
    }, [id, email, first, last, company, country])


    const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault;

        const params = formatPostParams();

        if (!isEditMode) {
            axios.post('https://localhost:7061/api/Customer', params)
                .then(response => {
                    clearForm();
                    getAll();
                    closeModal();
                });
        }
        else {
            axios.put('https://localhost:7061/api/Customer', params)
                .then(response => {
                    clearForm();
                    getAll();
                    closeModal();
                });
        }
    };

    return (
        <form>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={showModal}
                onClose={closeModal}
                width={'750px'}
            >
                <Modal.Header>
                    <Text b id="modal-title" size={18}>
                        {isEditMode ? 'Edit Customer' : 'Add Customer'}
                    </Text>
                </Modal.Header>
                <Modal.Body>

                    <Grid.Container gap={4}>
                        <Grid>
                            <Input
                                disabled={isEditMode}
                                value={id}
                                id='id'
                                underlined
                                labelPlaceholder="Id"
                                color='primary'
                                onChange={event => setId(event.target.value)}
                            />
                        </Grid>
                        <Grid>
                            <Input
                                value={email}
                                id="email"
                                underlined
                                labelPlaceholder="Email"
                                color="primary"
                                onChange={event => setEmail(event.target.value)}
                            />
                        </Grid>
                        <Grid>
                            <Input
                                value={first}
                                id="first"
                                underlined
                                labelPlaceholder="First"
                                color="primary"
                                onChange={event => setFirst(event.target.value)}
                            />
                        </Grid>
                        <Grid>
                            <Input
                                value={last}
                                id="last"
                                underlined
                                labelPlaceholder="Last"
                                color="primary"
                                onChange={event => setLast(event.target.value)}
                            />
                        </Grid>
                        <Grid>
                            <Input
                                value={company}
                                id="company"
                                underlined
                                labelPlaceholder="Company"
                                color="primary"
                                onChange={event => setCompany(event.target.value)}
                            />
                        </Grid>
                        <Grid>
                            <Input
                                value={country}
                                id="country"
                                underlined
                                labelPlaceholder="Country"
                                color="primary"
                                onChange={event => setCountry(event.target.value)}
                            />
                        </Grid>
                    </Grid.Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeModal}>
                        Close
                    </Button>
                    <Button disabled={disableButton} auto onClick={(e: any) => handleSubmit(e)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </form >
    )
}
