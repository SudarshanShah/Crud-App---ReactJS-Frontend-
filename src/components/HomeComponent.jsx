import React, { Component } from 'react';

class HomeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <div className="mt-5">

                <div className="jumbotron bg-white">

                    <h1 className="display-4  text-center">Hello !!!</h1>
                    <p className="text-center">This is the Full-Stack Spring Boot ReactJS Employee Management Application.</p>
                    <div className="text-center">
                        <a className="btn btn-primary btn-lg" href="/employees" role="button">Start Using App</a>
                    </div>

                </div>

            </div>
        );
    }
}

export default HomeComponent;