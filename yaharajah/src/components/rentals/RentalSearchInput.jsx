import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
class RentalSearchInput extends Component {
    constructor(){
        super();
        this.searchInputRef= React.createRef();
    }
    handleKeyPress=(event)=>{
        if(event.key === 'Enter'){

        }
    }
    handleSearch=()=>{
        const {history} = this.props;
        const city = this.searchInputRef.current.value;

        city ? history.push(`rentals/${city}/homes`) : history.push('/rentals')
    }
  render() {
    return (
      <div>
              <form className="form-inline my-2 my-lg-0">
              <input
              onKeyPress={this.handleKeyPress}
              ref={this.searchInputRef}
                className="form-control mr-sm-2 btn-bwm-search bwm-search"
                type="search"
                placeholder="ابحث"
                aria-label="Search"
              />
              <button
              onClick={this.handleSearch}
                className="btn bg-primary text-white my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
      </div>
    )
  }
}

export default withRouter(RentalSearchInput);