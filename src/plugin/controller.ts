import moment from "moment";

figma.showUI(__html__, { width: 320, height: 295 });

figma.ui.onmessage = async msg => {
  if (msg.type === "create-table") {
    // Load our fonts first.
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });

    let pages = [];

    figma.root.children.forEach(page => {
      pages.push(page.name);
    });

    // Create table of content page
    let tableOfContents = figma.createPage();
    figma.currentPage = tableOfContents;

    // The frame for the entire table of contents.
    let coverFrame = figma.createFrame();

    // Wraps text content.
    let wrapperFrame = figma.createFrame();

    // Frame for wrapping the list of pages.
    let listFrame = figma.createFrame();

    // Frame for wrapping the list of links.
    let linksFrame = figma.createFrame();

    // The right hand image
    let imageFrame = figma.createFrame();

    // Timestamp
    let timestamp = figma.createText();

    if (pages.includes("Table of Contents")) {
      // do nothing right now
    } else {
      // Set page name
      tableOfContents.name = "Table of Contents";

      // Set cover frame properties.
      coverFrame.name = "Table of Contents";
      coverFrame.layoutMode = "HORIZONTAL";
      coverFrame.resize(960, 480);
      coverFrame.counterAxisSizingMode = "AUTO";
      coverFrame.verticalPadding = 0;
      coverFrame.horizontalPadding = 0;
      coverFrame.cornerRadius = 16;

      // Set wrapper frame properties.
      // This wraps the text content.
      wrapperFrame.name = "Wrapper frame";
      wrapperFrame.layoutMode = "VERTICAL";
      wrapperFrame.resize(480, 480);
      wrapperFrame.counterAxisSizingMode = "FIXED";
      wrapperFrame.verticalPadding = 32;
      wrapperFrame.horizontalPadding = 32;
      coverFrame.appendChild(wrapperFrame);

      // Create the frame for the right side
      imageFrame.name = "Project Image";
      imageFrame.resize(480, 480);
      coverFrame.appendChild(imageFrame);

      const fills = clone(imageFrame.fills);
      fills[0].color.r = 0.9764705896377563;
      fills[0].color.b = 0.9764705896377563;
      fills[0].color.g = 0.9764705896377563;

      imageFrame.fills = fills;

      listFrame.name = "List of Pages";
      listFrame.layoutMode = "VERTICAL";
      listFrame.counterAxisSizingMode = "AUTO";
      listFrame.verticalPadding = 32;
      listFrame.horizontalPadding = 0;
      listFrame.itemSpacing = 8;
      wrapperFrame.appendChild(listFrame);

      linksFrame.name = "Additional Links";
      linksFrame.layoutMode = "VERTICAL";
      linksFrame.counterAxisSizingMode = "AUTO";
      linksFrame.verticalPadding = 16;
      linksFrame.horizontalPadding = 0;
      linksFrame.itemSpacing = 8;
      wrapperFrame.appendChild(linksFrame);
    }

    let createHeader = () => {
      let coverHead = figma.createText();
      coverHead.fontName = { family: "Inter", style: "Bold" };
      coverHead.characters = figma.root.name;
      coverHead.fontSize = 36;
      wrapperFrame.insertChild(0, coverHead);
    };

    let createPageItem = (name: string) => {
      let textFrame = figma.createText();
      textFrame.fontName = { family: "Inter", style: "Regular" };
      textFrame.characters = `${name} ->`;
      textFrame.fontSize = 24;
      listFrame.appendChild(textFrame);
    };

    let createLinkLabel = () => {
      let linkLabel = figma.createText();
      linkLabel.fontName = { family: "Inter", style: "Regular" };
      linkLabel.characters = "Other links";
      linkLabel.fontSize = 16;
      linksFrame.appendChild(linkLabel);
    };

    let createAdditionalLink = () => {
      let linkListItem = figma.createText();
      linkListItem.fontName = { family: "Inter", style: "Regular" };
      linkListItem.characters = "Example Link";
      linkListItem.fontSize = 20;
      linksFrame.appendChild(linkListItem);
    };

    let createTimestamp = () => {
      timestamp.fontName = { family: "Inter", style: "Regular" };
      timestamp.characters = moment().format("MMMM Do, YYYY");
      timestamp.fontSize = 16;
      wrapperFrame.appendChild(timestamp);

      // #B2B2B2
      const fills = clone(timestamp.fills);
      fills[0].color.r = 0.6980392336845398;
      fills[0].color.b = 0.6980392336845398;
      fills[0].color.g = 0.6980392336845398;

      timestamp.fills = fills;
    };

    // Updates the height and positions of various layers
    // depending on if the project is really large or small.
    let updateHeightandPositions = () => {
      // If its a small project we want to resize the whole frame
      // and remove the auto layout so its still our minimum size of 960 by 480.
      if (wrapperFrame.height <= 480) {
        coverFrame.counterAxisSizingMode = "FIXED";
        coverFrame.resize(960, 480);
        wrapperFrame.layoutMode = "NONE";
        wrapperFrame.resize(480, 480);

        // Position the timestamp in the bottom corner.
        timestamp.x = 32;
        timestamp.y = coverFrame.height - 32 - timestamp.height;
      }

      // Update the right side to match the height of the content/pages frame.
      imageFrame.resize(480, wrapperFrame.height);
    };

    let run = async pages => {
      pages.forEach(page => {
        createPageItem(page);
      });

      createHeader();
      createLinkLabel();
      createAdditionalLink();
      createTimestamp();
      updateHeightandPositions();

      figma.closePlugin();
    };

    run(pages);

    function clone(val) {
      return JSON.parse(JSON.stringify(val));
    }

    figma.ui.postMessage({
      type: "table-created",
      message: `done`
    });
  }

  figma.closePlugin();
};
