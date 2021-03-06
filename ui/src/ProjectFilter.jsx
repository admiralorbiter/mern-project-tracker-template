/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import URLSearchParams from 'url-search-params';
import {withRouter} from 'react-router-dom';
import { Button, ButtonToolbar, FormGroup, FormControl, 
         InputGroup, FormLabel, Row, Col } from 'react-bootstrap';



class ProjectFilter extends React.Component {
  constructor({location: {search}}) {
    super();
    const params = new URLSearchParams(location.search);
    this.state={status: params.get('status')|| '',
                effortMin: params.get('effortMin')|| '',
                effortMax: params.get('effortMax')|| '',
                changed: false};

    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.showOriginalFilter = this.showOriginalFilter.bind(this);
    this.onChangeEffortMin = this.onChangeEffortMin.bind(this);
    this.onChangeEffortMax = this.onChangeEffortMax.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { location: {search: prevSearch} } = prevProps;
    const { location: {search} } = this.props;
    if(prevSearch !== search){this.showOriginalFilter();}
  }

  onChangeStatus(e){
    this.setState({status: e.target.value, changed: true});
  }

  onChangeEffortMin(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effortMin: e.target.value, changed: true });
    }
  }

  onChangeEffortMax(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effortMax: e.target.value, changed: true });
    }
  }

  applyFilter(){
    const {status, effortMin, effortMax} = this.state;
    const {history} = this.props;
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (effortMin) params.set('effortMin', effortMin);
    if (effortMax) params.set('effortMax', effortMax);
    const search = params.toString() ? `?${params.toString()}` : '';
    history.push({ pathname: '/projects', search });
  }

  showOriginalFilter() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    this.setState({
    status: params.get('status') || '',
    effortMin: params.get('effortMin') || '',
    effortMax: params.get('effortMax') || '',
    changed: false,
    });
  }

  render() {
    const{status, changed} = this.state;
    const { effortMin, effortMax } = this.state;
    const {location: {search}} = this.props;
    const params = new URLSearchParams(search);
    return (
      <Row>
        <Col xs={6} sm={4} md={3} lg={2}>
          {/* <select value={status} onChange={this.onChangeStatus}>
            <option value="">(All)</option>
            <option value="New">New</option>
            <option value="Assigned">Assigned</option>
            <option value="Fixed">Fixed</option>
            <option value="Closed">Closed</option>
          </select> */}
          <FormGroup>
            <FormLabel>Status:</FormLabel>
            <FormControl as="select" value={status} onChange={this.onChangeStatus}>
            <option value="">(All)</option>
            <option value="New">New</option>
            <option value="Assigned">Assigned</option>
            <option value="Fixed">Fixed</option>
            <option value="Closed">Closed</option>
            </FormControl>
          </FormGroup>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
          <FormGroup>
            <FormLabel>Effort between: </FormLabel>
            <InputGroup>
              <FormControl value={effortMin} onChange={this.onChangeEffortMin} />
              {/* <InputGroup.Append>-</InputGroup.Append> */}
              {' - '}
              <FormControl value={effortMax} onChange={this.onChangeEffortMax} />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
          <FormGroup>
            <FormLabel>&nbsp;</FormLabel>
            <ButtonToolbar>
              <Button type="button" onClick={this.applyFilter}>Apply</Button>
              <Button type="button" onClick={this.showOriginalFilter}>Reset</Button>
            </ButtonToolbar>
          </FormGroup>
        </Col>
      </Row>
    );
  }
}

export default withRouter(ProjectFilter);
