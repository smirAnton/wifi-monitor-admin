export const VERSIONS_PROJECTION = `
  _id
  version
  features
  createdAt
  updatedAt
`;

export const ICONS_PROJECTION = `
  _id
  name
  icon
  keywords
  createdAt
  updatedAt
`;

export const DEVICE_PROJECTION = `
  _id
  nickname
  timezone
  version
  link2ui
  isTunnel
  ports
  portsUI
  comment
  adminEmail
  sentReportManualAt
  internalIP
  password
  secret
  sentReportAutoAt
  version2update
  shouldUseRemoteAccess
  shouldUpdateDictionaries
  shouldUpdateBundle
  shouldUpdateIcons
  createdAt
  updatedAt
`;

export const SETTINGS_PROJECTION = `
  _id
  email
  defaultDictionaryVersion
  createdAt
  updatedAt
`;

export const DNS_DICTIONARY_PROJECTION = `
  keyword
  keywordService
  keywordCategory
  keywordSubcategory
  differenceTimeConstrain
  sentBytesConstrain
  receivedBytesConstrain
  startTimeConstrain
  endTimeConstrain
  dnsResponseIPConstrain
  dnsResponseNameConstrain
  deviceHostnameConstrain
  dnsRequestConstrain
  ndpiConstrain
  portsConstrain
  dnsRequestsConstrain
  densityConstrain
  bandwidthConstrain
  bandwidthRatioConstrain
  dnsResponseIPsConstrain
  dnsResponseNamesConstrain
`;

export const NDPI_DICTIONARY_PROJECTION = `
  ndpi
  ndpiService
  ndpiCategory
  differenceTimeConstrain
  sentBytesConstrain
  receivedBytesConstrain
  startTimeConstrain
  endTimeConstrain
  dnsResponseIPConstrain
  dnsResponseNameConstrain
  deviceHostnameConstrain
  dnsRequestConstrain
  ndpiConstrain
  portsConstrain
  dnsRequestsConstrain
  densityConstrain
  bandwidthConstrain
  bandwidthRatioConstrain
  dnsResponseIPsConstrain
  dnsResponseNamesConstrain
`;

export const SUPER_DICTIONARY_PROJECTION = `
  keyword
  ndpi
  isAnd
  superService
  superCategory
  superSubcategory
  differenceTimeConstrain
  sentBytesConstrain
  receivedBytesConstrain
  startTimeConstrain
  endTimeConstrain
  dnsResponseIPConstrain
  dnsResponseNameConstrain
  deviceHostnameConstrain
  dnsRequestConstrain
  ndpiConstrain
  portsConstrain
  dnsRequestsConstrain
  densityConstrain
  bandwidthConstrain
  bandwidthRatioConstrain
  dnsResponseIPsConstrain
  dnsResponseNamesConstrain
`;

export const CATEGORY_PROJECTION = `
  _id
  name
  bandwidthConstrain
  sentBytesConstrain
  receivedBytesConstrain
  upArrowPercent
  downArrowPercent
  sentLightThreshold
  sentBoldThreshold
  receivedLightThreshold
  receivedBoldThreshold
`;

export const SNAPSHOTS_PROJECTION = `
  _id
  version
  description
  isActive
  categorySnapshot
  dnsSnapshot
  ndpiSnapshot
  superSnapshot
  createdAt
`;
