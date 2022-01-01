import React from 'react';
import graphQLFetch from './graphQLFetch.js';
export default class ProjectDetail extends React.Component {
    constructor() {
        super();
        this.state = { project: {} };
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        const { match: { params: { id: prevId } } } = prevProps;
        const { match: { params: { id } } } = this.props;
        if (prevId !== id) {
            this.loadData();
        }
    }

    async loadData() {
        const { match: { params: { id } } } = this.props;
        const query = `query project($id: Int!) {
            project (id: $id) {
                id description
            }
        }`;
        const data = await graphQLFetch(query, { id });
        if (data) {
            this.setState({ project: data.project });
        } else {
            this.setState({ project: {} });
        }
    }

    render() {
        const { project: { description } } = this.state;
        return (
            <div>
                <h3>Description</h3>
                <pre>{description}</pre>
            </div>
        );
    }
}