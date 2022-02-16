import React from "react";

class Navbar extends React.Component {
	render() {
		return (
			<nav id="navbar">
				<ul>
					<li className="nav-button" onClick={() => this.props.changeNav("companies")}>
						<span className="material-icons">business</span>
						<h5>Companies</h5>
					</li>
					<li className="nav-button" onClick={() => this.props.changeNav("articles")}>
						<span className="material-icons">book</span>
						<h5>Articles</h5>
					</li>
					<li className="nav-button" onClick={() => this.props.changeNav("applications")}>
						<span className="material-icons">apps</span>
						<h5>Apps</h5>
					</li>
					<li className="nav-button" onClick={() => this.props.changeNav("backups")}>
						<span className="material-icons">cloud_upload</span>
						<h5>Backup</h5>
					</li>
					<li className="nav-button">
						<span className="material-icons" onClick={() => this.props.changeNav("email")}>mail</span>
						<h5>Email</h5>
					</li>
					<li className="nav-button">
						<span className="material-icons" onClick={() => this.props.changeNav("shares")}>folder</span>
						<h5>File Shares</h5>
					</li>
					<li className="nav-button">
						<span className="material-icons" onClick={() => this.props.changeNav("networks")}>wifi</span>
						<h5>Networks</h5>
					</li>
					<li className="nav-button">
						<span className="material-icons" onClick={() => this.props.changeNav("servers")}>storage</span>
						<h5>Servers</h5>
					</li>
				</ul>
			</nav>

		)
	}
}

export default Navbar;