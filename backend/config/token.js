import jwt from 'jsonwebtoken';

const genToken = async (userId) => {
    try {
        // Use { userId: userId } as payload
        const token = await jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: "10d" });
        return token;
    } catch (error) {
        console.log(error);
    }
}

export default genToken;