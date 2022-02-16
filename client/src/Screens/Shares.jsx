import React from "react";

class Shares extends React.Component {
	
	render() {
		return (
			<div id="share-container">
				<div id="share-card">
					<label htmlFor="server">Server</label>
					<input
						name="shareServer"
						type="text"
						value={this.props.shareServer}
						onChange={this.props.handleShareChange}
					/>
					<label htmlFor="rootpath">Root Path</label>
					<input
						name="shareRootPath"
						type="text"
						value={this.props.shareRootPath}
						onChange={this.props.handleShareChange}
					/>
					<label htmlFor="driveletters">Drive Letters</label>
					<input
						name="shareDriveLetters"
						type="text"
						value={this.props.shareDriveLetters}
						onChange={this.props.handleShareChange}
					/>
					<label htmlFor="flexSwitchCheckDefault">On Prem</label>
					<form
						id="on-prem-switch"
						className="form-check form-switch"
					>
						<input
							id="flexSwitchCheckDefault"
							className="form-check-input"
							type="checkbox"
							checked={this.props.shareOnPrem}
							value={this.props.shareOnPrem}
							onChange={this.props.handleCheckChange}
						/>
					</form>
				</div>
				<button onClick={this.props.updateShares}>Save</button>
			</div>
		);
	}
}

export default Shares;