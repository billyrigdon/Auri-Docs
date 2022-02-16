import React from "react";

class Email extends React.Component {
	
	render() {
		return (
			<div id="email-container">
				<div id="email-card">
					<label htmlFor="platform">Platform</label>
					<input
						type="text"
						value={this.props.newEmailPlatform}
						onChange={this.props.handleEmailPlatformChange}
					/>
					<label htmlFor="webmail">Webmail</label>
					<input
						type="text"
						value={this.props.newEmailWebmail}
						onChange={this.props.handleEmailWebmailChange}
					/>
					<label htmlFor="server">Server</label>
					<input
						type="text"
						value={this.props.newEmailServer}
						onChange={this.props.handleEmailServerChange}
					/>
					<label htmlFor="domains">Domains</label>
					<input
						type="text"
						value={this.props.newEmailDomains}
						onChange={this.props.handleEmailDomainsChange}
					/>
				</div>
				<button onClick={this.props.updateEmail}>Save</button>
			</div>
		);
	}
}

export default Email;