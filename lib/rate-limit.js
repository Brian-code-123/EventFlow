const rateLimitMap = new Map();

export function rateLimit(options) {
    const { interval = 60000 } = options || {};

    return {
        check: (limit, token) => {
            const now = Date.now();
            const tokenData = rateLimitMap.get(token) || { count: 0, startTime: now };

            if (now - tokenData.startTime > interval) {
                tokenData.count = 1;
                tokenData.startTime = now;
            } else {
                tokenData.count += 1;
            }

            rateLimitMap.set(token, tokenData);

            const isRateLimited = tokenData.count > limit;

            return {
                isRateLimited,
                currentUsage: tokenData.count,
                limit,
            };
        },
    };
}
