import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            employees: []
        }

        // binding button onClick method to addEmployee() 
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(
            (res) => {
                this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
            }
        );
    }

    editEmployee(id) {
        this.props.history.push(`/save-employee/${id}`);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then(
            (response) => {
                this.setState({ employees: response.data });
            }
        );
    }

    // whenever button is clicked...it will open the component at given URL.
    addEmployee() {
        // 'history' object is passed to each mapping by 'Router' as 'props'.
        // so 'history' object has all mappings of route.
        this.props.history.push('/save-employee/-1');
    }

    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }

    render() {
        return (
            <div>

                <h2 className="text-center mt-2">Employees List</h2>

                <div className="row">
                    <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                </div>

                <div className="row mt-2">

                    <table className="table table-stripped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.email}</td>
                                            <td>
                                                <button onClick={() => this.editEmployee(employee.id)}
                                                    className="btn btn-info">
                                                    Update
                                                </button>
                                                <button onClick={() => this.deleteEmployee(employee.id)}
                                                    className="btn btn-danger ml-2">
                                                    Delete
                                                </button>
                                                <button onClick={() => this.viewEmployee(employee.id)}
                                                    className="btn btn-warning ml-2">
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        );
    }
}

export default ListEmployeeComponent;