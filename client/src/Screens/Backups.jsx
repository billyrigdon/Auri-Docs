import React from "react";

class Backups extends React.Component {
	
	render() {
		return (
			<div id="backup-container">
				<div id="backup-info-container">
					<div className="backup-card">
						<form className="backup-form">
							<h2>Offsite</h2>
							<label htmlFor="technology">Technology </label>
							<input
								onChange={this.props.handleBackupOTChange}
								value={this.props.newOffsiteTechnology}
								placeholder={
									this.props.backups.offsiteTechnology
								}
							/>
							<label htmlFor="frequency">Frequency</label>
							<input
								onChange={this.props.handleBackupOFChange}
								value={this.props.newOffsiteFrequency}
								placeholder={
									this.props.backups.offsiteFrequency
								}
							/>
							<label htmlFor="Location">Location</label>
							<input
								onChange={this.props.handleBackupOLChange}
								value={this.props.newOffsiteLocation}
								placeholder={
									this.props.backups.offsiteDescription
								}
							/>
							<label htmlFor="Window">Window</label>
							<input
								onChange={this.props.handleBackupOWChange}
								value={this.props.newOffsiteWindow}
							/>
							<label htmlFor="description">Description</label>
							<textarea
								onChange={this.props.handleBackupODChange}
								value={this.props.newOffsiteDescription}
								placeholder={
									this.props.backups.offsiteDescription
								}
							/>
						</form>
					</div>
					<div className="backup-card">
						<form className="backup-form">
							<h2>Local</h2>
							<label htmlFor="technology">Technology </label>
							<input
								onChange={this.props.handleBackupLTChange}
								value={this.props.newLocalTechnology}
								placeholder={this.props.backups.localTechnology}
							/>
							<label htmlFor="frequency">Frequency</label>
							<input
								onChange={this.props.handleBackupLFChange}
								value={this.props.newLocalFrequency}
								placeholder={this.props.backups.localFrequency}
							/>
							<label htmlFor="Location">Location</label>
							<input
								onChange={this.props.handleBackupLLChange}
								value={this.props.newLocalLocation}
								placeholder={
									this.props.backups.localDescription
								}
							/>
							<label htmlFor="Window">Window</label>
							<input
								onChange={this.props.handleBackupLWChange}
								value={this.props.newLocalWindow}
							/>
							<label htmlFor="description">Description</label>
							<textarea
								onChange={this.props.handleBackupLDChange}
								value={this.props.newLocalDescription}
								placeholder={
									this.props.backups.localDescription
								}
							/>
						</form>
					</div>
				</div>
				<button
					id="save-backup-button"
					onClick={this.props.updateBackup}
					className="btn btn-primary"
				>
					Save
				</button>
			</div>
		);
	}
}

export default Backups;