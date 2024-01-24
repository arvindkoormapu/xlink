import React, { Component } from 'react';
import { Avatar, Drawer, Divider } from 'antd';
import { 
	MobileOutlined, 
	MailOutlined, 
	CompassOutlined,
} from '@ant-design/icons';

export class View extends Component {
	render() {
		const { data, visible, close} = this.props;
		return (
			<Drawer
				width={300}
				placement="right"
				onClose={close}
				closable={false}
				open={visible}
			>
				<div className="text-center mt-3">
					<Avatar size={80} src={data?.image} />
					<h3 className="mt-2 mb-0">{data?.name}</h3>
					<span className="text-muted">{data?.url}</span>
				</div>
				<Divider dashed />
				<div className="mt-5">
					<h6 className="text-muted text-uppercase mb-3">CONTACT</h6>
					<p>
						<MobileOutlined />
						<span className="ml-3 text-dark">{data?.contactnumber}</span>
					</p>
					<p>
						<MailOutlined />
						<span className="ml-3 text-dark">{data?.emailaddress1? data?.emailaddress1: '-'}</span>
					</p>
					<p>
						<CompassOutlined />
						<span className="ml-3 text-dark">{data?.city}</span>
					</p>
				</div>
			</Drawer>
		)
	}
}

export default View
