CREATE TABLE "users" (
	"id" serial NOT NULL,
	"username" varchar(30) NOT NULL UNIQUE,
	"email" varchar(100) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"photo" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "posts" (
	"id" serial NOT NULL,
	"userId" int NOT NULL,
	"url" TEXT NOT NULL,
	"description" TEXT,
	"createdAt" TIMESTAMP NOT NULL,
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hashtags" (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "hashtags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "likes" (
	"id" serial NOT NULL,
	"userId" int NOT NULL,
	"postId" int NOT NULL,
	CONSTRAINT "likes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hashtagsPost" (
	"id" serial NOT NULL,
	"hashtagId" int NOT NULL,
	"postId" int NOT NULL,
	CONSTRAINT "hashtagsPost_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");


ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id");

ALTER TABLE "hashtagsPost" ADD CONSTRAINT "hashtagsPost_fk0" FOREIGN KEY ("hashtagId") REFERENCES "hashtags"("id");
ALTER TABLE "hashtagsPost" ADD CONSTRAINT "hashtagsPost_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id");






