export async function signOutUser(req, res) {
  console.log("singOut");
  res.clearCookie("token");
  res.success("cookie cleared successfully!");
}
