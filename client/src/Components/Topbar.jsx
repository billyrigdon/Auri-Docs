import React from "react";

class Topbar extends React.Component {
	render() {
		const allCompanies = this.props.companyList.map((item) => (
			<option value={item.name}>{item.name}</option>
		));

		return (
			<div id="topbar">
				<div id="logo">
					<span className="material-icons">pets</span>
					<h1>Auri</h1>
				</div>
				<div id="dropdown-profile">
					<select
						name="Dropdown"
						id="Companies"
						value=""
						onChange={this.props.selectCompany}
					>
						<option value="">{this.props.companyName}</option>
						{allCompanies}
					</select>
					<span className="material-icons">account_circle</span>
				</div>
			</div>
		);
	}
}

export default Topbar;
