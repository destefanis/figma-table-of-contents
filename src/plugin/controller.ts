import * as moment from "moment";

// Set UI height and width
figma.showUI(__html__, { width: 320, height: 262 });

figma.ui.onmessage = async msg => {
  let pages = [];
  let currentSelection;

  // Frame for wrapping the list of pages.
  let listFrame = figma.createFrame();

  // Load our fonts first, load your own brand fonts here.
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  // Utility function for cloning node fills
  function clone(val) {
    return JSON.parse(JSON.stringify(val));
  }

  // Remove the white fill from the pages list.
  const listFills = clone(listFrame.fills);
  listFills[0].visible = false;
  listFrame.fills = listFills;

  // Check whether or not the user has something selected.
  // Used for where to add pages if that option is selected.
  if (figma.currentPage.selection.length !== 0) {
    currentSelection = figma.currentPage.selection[0];
  } else {
    currentSelection = figma.currentPage;
  }

  // Loop through our documents pages and add them
  // to our own pages array.
  figma.root.children.forEach(page => {
    pages.push(page.name);
  });

  // Utility function for styling the page names
  // and adding them to the list frame.
  let createPageItem = (name: string, arrow: boolean) => {
    let textFrame = figma.createText();
    textFrame.fontName = { family: "Inter", style: "Regular" };
    textFrame.fontSize = 24;

    if (arrow === true) {
      textFrame.characters = `${name} ->`;
    } else {
      textFrame.characters = name;
    }

    listFrame.appendChild(textFrame);
  };

  if (msg.type === "create-pages") {
    // Styles for the frame that contains our list of pages.
    listFrame.name = "List of Pages";
    listFrame.layoutMode = "VERTICAL";
    listFrame.counterAxisSizingMode = "AUTO";
    listFrame.verticalPadding = 32;
    listFrame.horizontalPadding = 0;
    listFrame.itemSpacing = 8;

    currentSelection.appendChild(listFrame);

    let generateList = async pages => {
      pages.forEach(page => {
        createPageItem(page, false);
      });

      figma.closePlugin();
    };

    generateList(pages);
  } else if (msg.type === "create-table") {
    // Create table of content page
    let tableOfContents = figma.createPage();
    figma.currentPage = tableOfContents;

    // The frame for the entire table of contents.
    let coverFrame = figma.createFrame();

    // Wraps text content.
    let wrapperFrame = figma.createFrame();

    // Frame for wrapping the list of links.
    let linksFrame = figma.createFrame();

    // The right hand image
    let imageFrame = figma.createFrame();

    // This wraps the timestamp and "spacer" frame.
    let timeStampFrame = figma.createFrame();

    // Spacer frame for spacing the timestamp away from the "additional links" section.
    let spacerFrame = figma.createFrame();

    // Timestamp
    let timestamp = figma.createText();

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
    // This wraps all the left hand content (pages, links, name, timestamp).
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

    // Background of the image side of the table of contents.
    const fills = clone(imageFrame.fills);
    fills[0].color.r = 0.9764705896377563;
    fills[0].color.b = 0.9764705896377563;
    fills[0].color.g = 0.9764705896377563;
    imageFrame.fills = fills;

    // Set the properties of the list frame that contains our pages.
    listFrame.name = "List of Pages";
    listFrame.layoutMode = "VERTICAL";
    listFrame.counterAxisSizingMode = "AUTO";
    listFrame.verticalPadding = 32;
    listFrame.horizontalPadding = 0;
    listFrame.itemSpacing = 8;
    wrapperFrame.appendChild(listFrame);

    // Set the properties of the link frame that contains our 'additional links'.
    linksFrame.name = "Additional Links";
    linksFrame.layoutMode = "VERTICAL";
    linksFrame.counterAxisSizingMode = "AUTO";
    linksFrame.verticalPadding = 16;
    linksFrame.horizontalPadding = 0;
    linksFrame.itemSpacing = 8;
    wrapperFrame.appendChild(linksFrame);

    // Set the properties of the timestamp frame that contains our date.
    timeStampFrame.name = "Timestamp Frame";
    timeStampFrame.layoutMode = "VERTICAL";
    timeStampFrame.counterAxisSizingMode = "AUTO";
    timeStampFrame.verticalPadding = 0;
    timeStampFrame.horizontalPadding = 0;
    // 46 + 2px spacer frame for 48px total.
    timeStampFrame.itemSpacing = 46;
    wrapperFrame.appendChild(timeStampFrame);

    spacerFrame.name = "Spacer Frame";
    spacerFrame.resize(100, 2);
    timeStampFrame.appendChild(spacerFrame);

    let createHeader = () => {
      let coverHead = figma.createText();
      coverHead.fontName = { family: "Inter", style: "Bold" };
      coverHead.characters = figma.root.name;
      coverHead.fontSize = 36;
      wrapperFrame.insertChild(0, coverHead);
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
      timeStampFrame.appendChild(timestamp);

      // Set the timestamp color to #B2B2B2
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

    let generateTable = async pages => {
      // Using selection and viewport requires an array.
      // So we can focus and select the table once its generated.
      let layerArray = [];
      layerArray.push(coverFrame);

      pages.forEach(page => {
        createPageItem(page, true);
      });

      createHeader();
      createLinkLabel();
      createAdditionalLink();
      createTimestamp();
      updateHeightandPositions();

      figma.currentPage.selection = layerArray;
      figma.viewport.scrollAndZoomIntoView(layerArray);

      figma.closePlugin();
    };

    generateTable(pages);

    figma.ui.postMessage({
      type: "table-created",
      message: `done`
    });
  }

  figma.closePlugin();
};
