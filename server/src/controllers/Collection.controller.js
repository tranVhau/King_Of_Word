const { Collections, Categories, FlashCards, Accounts } = require("../models");

const index = async (req, res) => {
  const { contributor, tag, owned } = req.query;
  const userID = req.user._id;
  try {
    const tagFilter = tag && {
      categories: tag,
    };
    const contributorFilter = contributor && {
      "contributor.name": contributor,
    };
    const ownedFilter = owned && {
      owned: true,
    };

    const ownedCollectionIDArr = await Accounts.findById(userID).select({
      owned: 1,
      _id: 0,
    });

    const pipeline = [
      {
        $lookup: {
          from: "accounts",
          localField: "contributor",
          foreignField: "_id",
          as: "contributor",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $unwind: "$categories",
      },
      {
        $unwind: "$contributor",
      },
      {
        $group: {
          _id: "$_id",
          price: { $first: "$price" },
          contributor: { $first: "$contributor" },
          categories: { $push: "$categories.name" },
        },
      },
      {
        $project: {
          _id: 1,
          "contributor._id": 1,
          "contributor.name": 1,
          "contributor.photo": 1,
          categories: 1,
          price: 1,
        },
      },
      {
        $addFields: {
          owned: {
            $in: ["$_id", ownedCollectionIDArr.owned],
          },
        },
      },
      {
        $match: {
          ...contributorFilter,
          ...tagFilter,
          ...ownedFilter,
        },
      },
    ];
    const collections = await Collections.aggregate(pipeline);
    res.status(200).json({ data: collections });
  } catch (error) {
    res.status(500).json(error);
  }
};

const show = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "collection id is required" });
    }
    const flashcards = await FlashCards.find({ collectionID: req.params.id });

    res.status(200).json({ data: flashcards });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const store = async (req, res) => {
  const { categories, price, contributor } = req.body;
  try {
    const uniqueCategories = [...new Set(categories)];
    const collection = new Collections({
      categories: uniqueCategories,
      price: price,
      contributor: contributor,
    });
    await collection.save();
    await await Categories.updateMany(
      { _id: uniqueCategories },
      { $push: { collections: collection._id } }
    );
    res.status(201).json({ data: collection });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ data: "the request data is required" });
    }
    const targetCollection = Collections.findByIdAndDelete(id);
    if (targetCollection) {
      return res.status(201).json({ data: targetCollection });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  Collections.updateOne();
};

module.exports = { index, show, store, destroy, update };
