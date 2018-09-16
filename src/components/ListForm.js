import React, { Component } from 'react';
import { Table, Button, TableBody, TableRow, TableCell, Icon, Popup, Container } from 'semantic-ui-react'


class ListForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listform: this.props.listform
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ listform: nextProps.listform });
    }
    render() {
        return (
            <div>
                <Table>
                    <TableBody>
                        {this.state.listform.map((newdata, i) =>
                            <TableRow key={`list-row-${i}`}>
                                <TableCell>
                                    <Container text>
                                        <p>{`Name: ${this.state.listform[i].name}, Address: ${this.state.listform[i].street_address}, City: ${this.state.listform[i].city}, County:  ${this.state.listform[i].county},
                                    Postcode:  ${this.state.listform[i].post_code}, E-mail:  ${this.state.listform[i].email} `}</p>
                                    </Container>
                                    <Popup
                                        trigger={<Button floated="right" icon className="delete" onClick={() => this.props.handleDeleteRow(i)}><Icon name='trash alternate' /></Button>}
                                        content="Delete this line"
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