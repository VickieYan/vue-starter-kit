import { DefaultDockerName } from '@/pages/reserve_note/config';

var Host, Domain;
var dockerName = process.env.DOCKERNAME;

if (process.env.NODE_ENV === 'development')
  Domain = `.${dockerName || DefaultDockerName}.ab`;
else if (process.env.NODE_ENV === 'production')
  Domain = dockerName ? `-${dockerName}.mfwdev.com` : '.mafengwo.cn';

Host = `m${Domain}`;

export { Host, Domain };
