import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

// this is used for adding as well as updating the employee
class CreateEmployeeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            email: ''
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }

    componentDidMount() {

        if (this.state.id == -1) {
            return;
        }
        else {
            EmployeeService.getEmployeeById(this.state.id).then(
                (res) => {
                    let employee = res.data;
                    this.setState({ firstName: employee.firstName, lastName: employee.lastName, email: employee.email });
                }
            );
        }
    }

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value })
    }

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value })
    }

    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value })
    }

    saveEmployee = (e) => {
        e.preventDefault();

        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email };
        console.log('employee => ' + JSON.stringify(employee));

        if (this.state.id == -1) {
            EmployeeService.createEmployee(employee).then(
                (res) => {
                    this.props.history.push('/employees');
                }
            );
        }
        else {
            EmployeeService.updateEmployee(employee, this.state.id).then(
                (res) => {
                    this.props.history.push('/employees');
                }
            );
        }
    }

    cancel() {
        this.props.history.push('/employees');
    }

    getTitle() {
        if (this.state.id == -1) {
            return <h3 className="text-center">Add Employee</h3>
        }
        else {
            return <h3 className="text-center">Update Employee</h3>
        }
    }

    render() {
        return (
            <div>

                <div className="container mt-5">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label><strong>First Name</strong></label>
                                        <input placeholder="Enter First Name" name="firstName" className="form-control"
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label><strong>Last Name</strong></label>
                                        <input placeholder="Enter Last Name" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label><strong>Email</strong></label>
                                        <input placeholder="Enter Email Id" name="email" className="form-control"
                                            value={this.state.email} onChange={this.changeEmailHandler} />
                                    </div>

                                    <div className="container text-center">
                                        <button className="btn btn-success" onClick={this.saveEmployee}><strong>Save</strong></button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}><strong>Cancel</strong></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default CreateEmployeeComponent;