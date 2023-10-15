const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const UserModel = require('../models/user');
const server = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User Routes', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('GET /xuser', () => {
        it('should fetch all users', (done) => {
            const usersStub = sinon.stub(UserModel, 'findAll').returns(Promise.resolve([{ username: 'test', password: 'pass' }]));

            chai.request(server)
                .get('/xuser')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(usersStub.calledOnce).to.be.true;
                    done();
                });
        });
    });

    describe('POST /user', () => {
        it('should login a user', (done) => {
            const userStub = sinon.stub(UserModel, 'findOne').returns(Promise.resolve({ username: 'test', password: 'pass' }));

            chai.request(server)
                .post('/user')
                .send({ username: 'test', password: 'pass' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.text).to.equal('Successfully logged in');
                    expect(userStub.calledOnce).to.be.true;
                    done();
                });
        });

        it('should not login an invalid user', (done) => {
            const userStub = sinon.stub(UserModel, 'findOne').returns(Promise.resolve(null));

            chai.request(server)
                .post('/user')
                .send({ username: 'invalid', password: 'invalid' })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.text).to.equal('Invalid username or password');
                    expect(userStub.calledOnce).to.be.true;
                    done();
                });
        });
    });
});
