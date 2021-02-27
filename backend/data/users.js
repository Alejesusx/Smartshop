import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@user.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Esteban Quito',
    email: 'EstebanQuito@user.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Alejandro Pérez',
    email: 'ajperezm99@gmail.com',
    password: bcrypt.hashSync('28171506', 10),
  },
]

export default users
