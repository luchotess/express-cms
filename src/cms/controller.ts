import { Page } from 'cms/page.model';

export async function getPageController (req, res) {
    const _page = await Page.findOne({domain: req.params.page});

    res.json(_page ? _page.content : {});
}

export async function getPageTypesController (req, res) {
    const _page = await Page.findOne({domain: req.params.page});

    res.json(_page ? _page.types : {});
}

export async function createPageController (req, res) {
    const _page = await Page.create({
        domain: req.params.page,
        content: req.body
    });

    res.json(_page);
}

export async function updatePageController (req, res) {
    const payload = req.body;

    let _page = await Page.findOne({
        domain: req.params.page
    });

    _page.content = {..._page.content, ...payload};

    const pageSaved = await _page.save();

    res.json(pageSaved);
}

export async function updatePageTypesController (req, res) {
    const payload = req.body;

    let _page = await Page.findOne({
        domain: req.params.page
    });

    _page.types = {..._page.types, ...payload};

    const pageSaved = await _page.save();

    res.json(pageSaved);
}
