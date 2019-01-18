import crendentials from './crendentials';

class Configs {
    public host = 'smtp.mailtrap.io';
    public port = 2525;
    public user = crendentials.user;
    public password = crendentials.password;
}

export default new Configs();
