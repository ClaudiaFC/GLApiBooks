const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userController = (User) => {
   
    const getUser = async(req,res) =>{
        const {query}= req;
        const response = await User.find(query);
        res.json(response);
    }

    const postUser = async (req, res) => {
        const user = new User(req.body);
       user.password = await bcrypt.hash(user.password,10);
        
        await user.save();
        res.json(user);
    }

    const getUserById = async (req, res) => {
        const {params} = req;
        const response = await User.findById(params.userId);
        res.json(response);
    }

    const getUserByName = async (req, res) => {
        const {params} = req;
        const response = await User.findById(params.userName);
        res.json(response);
    }

    const putUser = async(req,res) => {
        const {body} = req;
        const response = await User.updateOne({
            _id: req.params.userId
        },
        {
            $set:{
                firstName: body.firstName,
                lastName: body.lastName,
                userName: body.userName,
                password: body.password,
                email : body.email,
                adress: body.adress,
                phone: body.phone
            }
        })
        res.json(response)
    }

    const deleteUser = async (req, res) => {
        const id = req.params.userId;
        await User.findByIdAndDelete(id);
        res.status(202).json('the user has been deleted OK');
      }
    
    const postLogin = async (req,res) => {
        const {body}= req;
        const response= await User.findOne({
            'userName':body.userName,
         
        });
        if (response=== null) {
            res.status(401).json('credenciales invalidas');
        }else if(body.password===response.password)
        {   const token = jwt.sign({data:response}, 'secret', { expiresIn: '8h' });
            
            res.status(200).json(
                {
                    authentication: 'sccesfully',
                    token 
                }
            )
        }else {
            res.status(401).json('invalid credentials')
        }
       
        console.log(response);
        //res.status(200).json('ok');
      }
    return{getUser, postUser, getUserById,getUserByName, putUser, deleteUser, postLogin};
};

module.exports = userController;