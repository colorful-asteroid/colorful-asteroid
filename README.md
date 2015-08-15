# Reflectiv #

<!-- 
> This material was originally posted [here](http://www.quora.com/What-is-Amazons-approach-to-product-development-and-product-management). It is reproduced here for posterities sake.

There is an approach called "working backwards" that is widely used at Amazon. They work backwards from the customer, rather than starting with an idea for a product and trying to bolt customers onto it. While working backwards can be applied to any specific product decision, using this approach is especially important when developing new products or features.

For new initiatives a product manager typically starts by writing an internal press release announcing the finished product. The target audience for the press release is the new/updated product's customers, which can be retail customers or internal users of a tool or technology. Internal press releases are centered around the customer problem, how current solutions (internal or external) fail, and how the new product will blow away existing solutions.

If the benefits listed don't sound very interesting or exciting to customers, then perhaps they're not (and shouldn't be built). Instead, the product manager should keep iterating on the press release until they've come up with benefits that actually sound like benefits. Iterating on a press release is a lot less expensive than iterating on the product itself (and quicker!).

If the press release is more than a page and a half, it is probably too long. Keep it simple. 3-4 sentences for most paragraphs. Cut out the fat. Don't make it into a spec. You can accompany the press release with a FAQ that answers all of the other business or execution questions so the press release can stay focused on what the customer gets. My rule of thumb is that if the press release is hard to write, then the product is probably going to suck. Keep working at it until the outline for each paragraph flows. 

Oh, and I also like to write press-releases in what I call "Oprah-speak" for mainstream consumer products. Imagine you're sitting on Oprah's couch and have just explained the product to her, and then you listen as she explains it to her audience. That's "Oprah-speak", not "Geek-speak".

Once the project moves into development, the press release can be used as a touchstone; a guiding light. The product team can ask themselves, "Are we building what is in the press release?" If they find they're spending time building things that aren't in the press release (overbuilding), they need to ask themselves why. This keeps product development focused on achieving the customer benefits and not building extraneous stuff that takes longer to build, takes resources to maintain, and doesn't provide real customer benefit (at least not enough to warrant inclusion in the press release).
 -->
 
## Simple Event Reflections ##

### Software sprint reflections at a glance ###


This tool is used to streamline the sprint reflection process used by many software development bootcamps and companies. Fast and anonymous feedback is essential in identifying key issues and promote an interactive environment

## Problem: ##
Sprint reflections are a time consuming process, that often involve 20 people crowding around a whiteboard. There is little opportunity for anonymity, which may discourage people from providing honest feedback. This process also makes it difficult for organizers to gather the necessary information needed for improvement.

## Solution: ##
With -product-'s easy to use interface, people can rapidly leave feedback, that can be easily organized and addressed. Anonymity allows participants to leave more honest feedback without worrying about outside judgement or influence.

## Quote from Muhsin ##
  >  ¯\_(ツ)_/¯ ~Moose

## How to Get Started ##
Visit www.reflectiv.futbol, and create a survey. Both organizers and participants can add topics to the survey. Once finalized, participants can give each item a score and leave brief feedback. Organizers can go over and export feedback.

Download PostgressApp 

Download pgadmin

In PGAdmin run this query:

```
CREATE DATABASE postgres
  WITH OWNER = icusmooth -- NOTE: you much change 'icusmooth' to be the name of your computer
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'en_US.UTF-8'
       LC_CTYPE = 'en_US.UTF-8'
       CONNECTION LIMIT = -1;

COMMENT ON DATABASE postgres
  IS 'default administrative connection database';
```

Still in PGAdmin, run this query:

```
CREATE TABLE topics
(
  id serial NOT NULL,
  text character varying(160) NOT NULL,
  vote integer NOT NULL,
  CONSTRAINT topics_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE topics
  OWNER TO icusmooth; -- NOTE: you much change 'icusmooth' to be the name of your computer
```

## Customer Quote ##
  > This process was a great improvement. I'm much more comfortable leaving feedback now.

### Improve your feedback process today with Reflectiv! ###
