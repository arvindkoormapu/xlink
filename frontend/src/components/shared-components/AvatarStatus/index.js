import React from 'react';
import PropTypes from 'prop-types'
import { Avatar, Switch } from 'antd';

const renderAvatar = props => {
	return <Avatar {...props} className={`ant-avatar-${props.type}`}>{props.text}</Avatar>;
}

export const AvatarStatus = props => {
	const { name, suffix, subTitle, id, type, src, icon, size, shape, gap, text, onNameClick, onChangeSwitch, checked } = props
	return (
		<div className="avatar-status d-flex align-items-center">
			{src ? renderAvatar({icon, src, type, size, shape, gap, text }) : <div><Switch defaultChecked={checked} onChange={onChangeSwitch} size="small" /></div>}
			<div className="ml-2">
				<div>
					{
						onNameClick ? 
						<div onClick={() => onNameClick({name, subTitle, src, id})} className="avatar-status-name clickable">{name}</div> 
						:
						<div className="avatar-status-name">{name}</div>
					}
					<span>{suffix}</span>
				</div>
				<div className="text-muted avatar-status-subtitle">{subTitle}</div>
			</div>
		</div>
	)
}

AvatarStatus.propTypes = {
	name: PropTypes.string,
	src: PropTypes.string,
	type: PropTypes.string,
	onNameClick: PropTypes.func
}


export default AvatarStatus;
