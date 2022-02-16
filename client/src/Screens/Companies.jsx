import React from "react";

class Companies extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			companyName: this.props.companyName,
		};
	}

	render() {
		const allCompanies = this.props.companyList.map((item) => (
			<div className="companyCard">
				<h6>{item.name}</h6>
				<button
					key={item.name}
					className="btn"
					value={item.name}
					onClick={this.props.selectCompany}
				>
					Select
				</button>
			</div>
		));

		return (
			<div key={this.props.companyName} id="company-container">
				<div id="company-info-container">
					<form
						className="companyEditFields"
						onSubmit={this.props.createCompany}
					>
						<button type="submit" className="btn">
							Create
						</button>
						<input
							onChange={this.props.handleNewCompanyChange}
							value={this.props.newCompany}
							placeholder="Enter New Company Name"
							type="text"
							required
						/>
					</form>
					<div id="current-company-card">
						<h6>Current Company</h6>
						<h4>{this.props.companyName}</h4>
					</div>
					<form className="companyEditFields">
						<h5>Name:</h5>
						<input
							onChange={this.props.handleNameChange}
							value={this.props.newName}
							type="text"
							required
						/>
					</form>
					<form
						className="companyEditFields"
						onSubmit={this.props.updateCompanyAddress}
					>
						<h5>Address:</h5>
						<input
							onChange={this.props.handleAddressChange}
							value={this.props.newAddress}
							type="text"
							required
						/>
					</form>
					<form
						className="companyEditFields"
						onSubmit={this.props.updateCompanyEmail}
					>
						<h5>Email:</h5>
						<input
							onChange={this.props.handleEmailChange}
							value={this.props.newEmailAddr}
							type="email"
							required
						/>
					</form>
					<form
						className="companyEditFields"
						onSubmit={this.props.updateCompanyPhone}
					>
						<h5>Phone:</h5>
						<input
							onChange={this.props.handlePhoneChange}
							value={this.props.newPhone}
							type="tel"
							required
						/>
					</form>
					<div id="company-buttons">
						<button
							id="companyUpdate"
							classname="btn btn-primary"
							onClick={this.props.updateCompanyInfo}
						>
							Save
						</button>
						<button
							id="company-delete"
							className="btn btn-danger"
							value={this.props.companyName}
							onClick={this.props.deleteCompany}
						>
							Delete
						</button>
					</div>
				</div>

				<div id="card-container">{allCompanies}</div>
			</div>
		);
	}
}

export default Companies;