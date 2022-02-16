import React from "react";

class Applications extends React.Component {
	render() {
		const app = this.props.apps.map((item, index) => (
			<div className="app-cards">
				<h3 className="app-title">
					<p>{item.name}</p>
				</h3>
				<button
					onClick={() => {
						this.props.selectApp(item);
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
						onChange={this.props.handleAppNameChange}
						value={this.props.updatedAppName}
						placeholder="App Name"
					/>
					<input
						onChange={this.props.handleAppInstallerChange}
						value={this.props.updatedAppInstaller}
						placeholder="Installer location"
					/>
					<textarea
						onChange={this.props.handleAppNotesChange}
						value={this.props.updatedAppNotes}
						placeholder="App Notes"
					/>
					<button
						id="save-app-button"
						onClick={this.props.updateApp}
						className="btn btn-primary"
					>
						Save
					</button>
					<button
						className="btn btn-danger"
						onClick={this.props.deleteApp}
					>
						Delete
					</button>
				</form>
				<div id="app-card-container">
					<div id="appList">{app}</div>
					<button
						id="create-app-button"
						onClick={this.props.createNewApp}
					>
						Create New App
					</button>
				</div>
			</div>
		);
	}
}

export default Applications;
