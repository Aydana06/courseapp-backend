export function setRefreshCookie(res, token) {
    res.cookie("refresh_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
}
export function clearRefreshCookie(res) {
    res.clearCookie("refresh_token", { path: "/" });
}
