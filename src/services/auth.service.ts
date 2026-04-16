import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../configs/prisma.config.js'

export const signUpService = async (userData: {
  email: string
  password: string
  fullName: string
  age: number | string
}) => {
  const { email, password, fullName, age } = userData

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) throw new Error('Email already registered')

  const hashedPassword = await bcrypt.hash(password, 10)

  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      fullName,
      age: Number(age)
    }
  })
}

export const signInService = async (loginData: { email: string; password: string }) => {
  const { email, password } = loginData

  // Find user by email
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('Invalid email or password')

  // Check password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Invalid email or password')

  // Generate JWT Token (Professional standard: expires in 1 day)
  const token = jwt.sign({ userId: user.userId, email: user.email }, process.env.JWT_SECRET as string, {
    expiresIn: '1d'
  })

  return token
}
