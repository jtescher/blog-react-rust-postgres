use schema::posts;

#[derive(Insertable, Identifiable, AsChangeset, Queryable, Debug, Deserialize, Serialize)]
#[table_name="posts"]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub body: String,
    pub published: bool,
}
