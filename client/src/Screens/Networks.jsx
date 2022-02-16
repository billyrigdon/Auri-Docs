import React from "react";

class Networks extends React.Component {
	
	render() {
		return (
			<div id="network-container">
				<div id="network-card-container">
					<div id="network-overview-card" className="network-card">
						<h2>Network Overview</h2>
						<div id="network-fields-container">
							<div className="network-overview-fields">
								<label htmlFor="subnet">Subnet</label>
								<input
									name="subnet"
									type="text"
									value={this.props.subnet}
									onChange={this.props.handleNetworksChange}
								/>
								<label htmlFor="public">Public IP</label>
								<input
									name="public"
									type="text"
									value={this.props.public}
									onChange={this.props.handleNetworksChange}
								/>
								<label htmlFor="gateway">Gateway Address</label>
								<input
									name="gateway"
									type="text"
									value={this.props.gateway}
									onChange={this.props.handleNetworksChange}
								/>
								<label htmlFor="dns">DNS Server</label>
								<input
									name="dns"
									type="text"
									value={this.props.dns}
									onChange={this.props.handleNetworksChange}
								/>
							</div>
							<div className="network-overview-fields">
								<label htmlFor="ddns">DDNS Address</label>
								<input
									name="ddns"
									type="text"
									value={this.props.ddns}
									onChange={this.props.handleNetworksChange}
								/>
								<label htmlFor="dhcpServer">DHCP Server</label>
								<input
									name="dhcpServer"
									type="text"
									value={this.props.dhcpServer}
									onChange={this.props.handleNetworksChange}
								/>
								<label htmlFor="dhcpScope">DHCP Scope</label>
								<input
									name="dhcpScope"
									type="text"
									value={this.props.dhcpScope}
									onChange={this.props.handleNetworksChange}
								/>
								<label htmlFor="domainController">
									Domain Controller
								</label>
								<input
									name="domainController"
									type="text"
									value={this.props.domainController}
									onChange={this.props.handleNetworksChange}
								/>
							</div>
						</div>
					</div>
					<div id="router-card" className="network-card">
						<h2>Router</h2>
						<div id="router-fields-container">
							<div className="router-fields">
								<label htmlFor="routerIpAddr">IP Address</label>
								<input
									name="routerIpAddr"
									type="text"
									value={this.props.routerIpAddr}
									onChange={this.props.handleNetworksChange}
								/>
								<label htmlFor="routerPortForwards">
									Port Forwards
								</label>
								<input
									name="routerPortForwards"
									type="text"
									value={this.props.routerPortForwards}
									onChange={this.props.handleNetworksChange}
								/>
								<label htmlFor="routerDhcp">DHCP</label>
								<form
									id="router-switch"
									className="form-check form-switch"
								>
									<input
										name="routerDhcp"
										id="flexSwitchCheckDefault"
										className="form-check-input"
										type="checkbox"
										checked={this.props.routerDhcp}
										value={this.props.routerDhcp}
										onChange={
											this.props.handleRouterDhcpChange
										}
									/>
								</form>
							</div>
							<div className="router-fields">
								<label htmlFor="routerNotes">Notes</label>
								<textarea
									name="routerNotes"
									type="text"
									value={this.props.routerNotes}
									onChange={this.props.handleNetworksChange}
								/>
							</div>
						</div>
					</div>
					<div id="wireless-card" className="network-card">
						<h2>Wireless</h2>
						<label htmlFor="wirelessSsid">SSID</label>
						<input
							name="wirelessSsid"
							type="text"
							value={this.props.wirelessSsid}
							onChange={this.props.handleNetworksChange}
						/>
						<label htmlFor="wirelessEncryption">
							Wireless Encryption
						</label>
						<input
							name="wirelessEncryption"
							type="text"
							value={this.props.wirelessEncryption}
							onChange={this.props.handleNetworksChange}
						/>
						<label htmlFor="wirelessMgmtURL">Management URL</label>
						<input
							name="wirelessMgmtURL"
							type="text"
							value={this.props.wirelessMgmtURL}
							onChange={this.props.handleNetworksChange}
						/>
					</div>
					<div id="vpn-card" className="network-card">
						<h2>VPN</h2>
						<label htmlFor="vpnType">VPN Type</label>
						<input
							name="vpnType"
							type="text"
							value={this.props.vpnType}
							onChange={this.props.handleNetworksChange}
						/>
						<label htmlFor="vpnPskLocation">PSK Location</label>
						<input
							name="vpnPskLocation"
							type="text"
							value={this.props.vpnPskLocation}
							onChange={this.props.handleNetworksChange}
						/>
						<label htmlFor="vpnPublicIP">VPN Server Address</label>
						<input
							name="vpnPublicIP"
							type="text"
							value={this.props.vpnPublicIP}
							onChange={this.props.handleNetworksChange}
						/>
						<label htmlFor="vpnClient">VPN Client</label>
						<input
							name="vpnClient"
							type="text"
							value={this.props.vpnClient}
							onChange={this.props.handleNetworksChange}
						/>
					</div>
				</div>

				<button
					id="router-save-button"
					onClick={this.props.updateNetworks}
				>
					Save
				</button>
			</div>
		);
	}
}

export default Networks;