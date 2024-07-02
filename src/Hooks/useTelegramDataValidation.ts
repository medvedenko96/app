import { useState, useEffect } from 'react';
import crypto from 'crypto';

interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    is_premium: boolean;
    allows_write_to_pm: boolean;
}

const useTelegramDataValidation = (queryString: string, botToken: string): [boolean, boolean, UserData | null] => {
    const [isValid, setIsValid] = useState(false);
    const [isRecent, setIsRecent] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const hmacSha256 = (key: string, msg: string): string => {
            return crypto.createHmac('sha256', key).update(msg).digest('hex');
        };

        const validateData = () => {
            const params = new URLSearchParams(queryString);

            // Extract and remove the hash
            const receivedHash = params.get('hash');
            if (!receivedHash) return;
            params.delete('hash');

            // Create data_check_string
            const dataCheckString = Array.from(params.entries())
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([key, value]) => `${key}=${value}`)
                .join('\n');

            // Compute secret_key
            const secretKey = crypto.createHmac('sha256', "WebAppData")
                .update(botToken)
                .digest('hex');

            // Compute HMAC-SHA-256 signature of data_check_string using secret_key
            const computedHash = hmacSha256(secretKey, dataCheckString);

            // Validate the hash
            if (computedHash === receivedHash) {
                setIsValid(true);

                // Parse user data if available
                const user = params.get('user');
                if (user) {
                    setUserData(JSON.parse(user));
                }

                // Optional: Check the auth_date to ensure the data is recent
                const authDate = parseInt(params.get('auth_date') || '0', 10);
                const currentTimestamp = Math.floor(Date.now() / 1000);
                if (currentTimestamp - authDate <= 86400) {  // 86400 seconds = 1 day
                    setIsRecent(true);
                } else {
                    setIsRecent(false);
                }
            } else {
                setIsValid(false);
            }
        };

        validateData();
    }, [queryString, botToken]);

    return [ isValid, isRecent, userData ];
};

export default useTelegramDataValidation;