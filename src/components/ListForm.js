import React, { Component } from 'react';
import { Table, Button, TableBody, TableRow, TableCell, Icon, Popup, Container } from 'semantic-ui-react'


class ListForm extends Component {

    render() {
        return (
            <div>
                <Table>
                    <TableBody>
                        {this.props.listform.map((newdata, i) =>
                            <TableRow key={`list-row-${i}`}>
                                <TableCell>
                                    <Container text>
                                        <p>{`Name: ${this.props.listform[i].name}, Group Description: ${this.props.listform[i].description}, Address: ${this.props.listform[i].street_address}, City: ${this.props.listform[i].city}, 
                                        Postcode: ${this.props.listform[i].post_code}, E-mail: ${this.props.listform[i].email}`}</p>
                                    </Container>
                                    <Popup
                                        trigger={<Button floated="right" icon className="delete" onClick={() => this.props.handleDeleteRow(this.props.listform[i].id)}><Icon name='trash alternate' /></Button>}
                                        content="Delete this line"
                                    />
                                    <Popup
                                        trigger={<Button floated="right" icon className="edit" onClick={() => this.props.handleEdit(this.props.listform[i].id)}><Icon name='edit' /></Button>}
                                        content="Edit this line"
                                    />

                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default ListForm;