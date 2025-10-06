import React from 'react';
import { getCurrentVersion } from '../../versioning/registry';
export function VersionBadge(){
  const { version, codename } = getCurrentVersion();
  return <a href="#milestones" className="muted">v{version}{codename? ` “${codename}”`:''}</a>;
}
