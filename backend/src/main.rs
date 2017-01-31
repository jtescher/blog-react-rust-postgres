#![feature(plugin, custom_derive, custom_attribute)]
#![plugin(rocket_codegen)]

#[macro_use]
extern crate lazy_static;
extern crate rocket;
#[macro_use(map)]
extern crate rocket_contrib;
#[macro_use]
extern crate diesel;
#[macro_use]
extern crate diesel_codegen;
extern crate blog;
extern crate json;
extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;
extern crate r2d2;
extern crate r2d2_diesel;

// Server Imports
// Used to Setup DB Pool
use rocket::request::{Outcome, FromRequest};
use rocket::Outcome::{Success, Failure};
use rocket::http::Status;

// Used for Routes
use rocket::Request;
use rocket_contrib::JSON;

// Std Imports
use std::collections::HashMap;

// DB Imports
use diesel::prelude::*;
use diesel::pg::PgConnection;
use r2d2::{Pool, PooledConnection, GetTimeout};
use r2d2_diesel::ConnectionManager;
use blog::models::Post;
use blog::*;

fn main() {
    rocket::ignite().mount("/", routes![posts_index, posts_create, posts_update]).launch();
}

// DB Items
lazy_static! {
    pub static ref DB_POOL: Pool<ConnectionManager<PgConnection>> = create_db_pool();
}

pub struct DB(PooledConnection<ConnectionManager<PgConnection>>);

impl DB {
    pub fn conn(&self) -> &PgConnection {
        &*self.0
    }
}

impl<'a, 'r> FromRequest<'a, 'r> for DB {
    type Error = GetTimeout;
    fn from_request(_: &'a Request<'r>) -> Outcome<Self, Self::Error> {
        match DB_POOL.get() {
            Ok(conn) => Success(DB(conn)),
            Err(e) => Failure((Status::InternalServerError, e)),
        }
    }
}

// Routes
#[get("/v1/posts")]
fn posts_index(db: DB) -> JSON<HashMap<&'static str, Vec<Post>>> {
    use blog::schema::posts::dsl::*;
    let result = posts.load::<Post>(db.conn()).expect("Error loading posts");

    JSON(map! {
        "posts" => result
    })
}

#[post("/v1/posts", format = "application/json", data = "<post_json>")]
fn posts_create(db: DB, post_json: JSON<Post>) -> JSON<HashMap<&'static str, Post>> {
    use blog::schema::posts;

    let saved_post = diesel::insert(&post_json.0)
        .into(posts::table)
        .get_result::<Post>(db.conn())
        .expect("Error creating post");

    JSON(map! {
        "post" => saved_post
    })
}

#[put("/v1/posts/<id>", format = "application/json", data = "<post_json>")]
#[allow(unused)]
fn posts_update(db: DB, id: i32, post_json: JSON<Post>) -> JSON<HashMap<&'static str, Post>> {
    let post = post_json.0;

    let updated_post = post.save_changes::<Post>(db.conn()).expect("Error saving post");

    JSON(map! {
        "post" => updated_post
    })
}
