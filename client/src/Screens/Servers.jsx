import React from "react";

class Servers extends React.Component {
	
	render() {
		const server = this.props.servers.map((item, index) => (
			<div className="app-cards">
				<h3 className="app-title">
					<p>{item.hostname}</p>
				</h3>
				<button
					onClick={() => {
						this.props.selectServer(item);
					}}
				>
					Select
				</button>
			</div>
		));

		return (
			<div id="applications-container">
				<form id="app-info">
					<input
						name="updatedServerHostname"
						onChange={this.props.handleServerChange}
						value={this.props.updatedServerHostname}
						placeholder="Hostname"
					/>
					<input
						name="updatedServerIP"
						onChange={this.props.handleServerChange}
						value={this.props.updatedServerIP}
						placeholder="IP Address"
					/>
					<input
						name="updatedServerRole"
						onChange={this.props.handleServerChange}
						value={this.props.updatedServerRole}
						placeholder="Server Role"
					/>
					<textarea
						name="updatedServerNotes"
						onChange={this.props.handleServerChange}
						value={this.props.updatedServerNotes}
						placeholder="Server Notes"
					/>
					<button
						id="save-app-button"
						onClick={this.props.updateServer}
						className="btn btn-primary"
					>
						Save
					</button>
					<button
						className="btn btn-danger"
						onClick={this.props.deleteServer}
					>
						Delete
					</button>
				</form>
				<div id="app-card-container">
					<div id="appList">{server}</div>
					<button
						id="create-app-button"
						onClick={this.props.createNewServer}
					>
						Create New Server
					</button>
				</div>
			</div>
		);
	}
}

export default Servers;