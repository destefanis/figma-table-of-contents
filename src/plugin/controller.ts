figma.showUI(__html__);

figma.ui.onmessage = async msg => {
  if (msg.type === "create-table") {
    await figma.loadFontAsync({ family: "Inter", style: "Medium" });
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });

    let pages = [];
    let coverFrame = figma.createFrame();
    let listWrapperFrame = figma.createFrame();
    let listFrame = figma.createFrame();

    figma.root.children.forEach(page => {
      pages.push(page.name);
    });

    if (pages.includes("Table of Contents")) {
      // do nothing right now
    } else {
      // Create table of content page
      let tableOfContents = figma.createPage();

      // Set page name
      tableOfContents.name = "Table of Contents";

      // Create the cover frame
      coverFrame.name = "Table of Contents";
      coverFrame.layoutMode = "VERTICAL";
      coverFrame.resize(740, 300);
      coverFrame.verticalPadding = 32;
      coverFrame.horizontalPadding = 32;

      // Create the pages frame
      // listWrapperFrame.name = "Pages";
      // listWrapperFrame.layoutMode = "VERTICAL";
      // listWrapperFrame.verticalPadding = 16;
      // listWrapperFrame.horizontalPadding = 0;
      // coverFrame.appendChild(listWrapperFrame);

      listFrame.name = "List of Pages";
      listFrame.layoutMode = "VERTICAL";
      listFrame.counterAxisSizingMode = "AUTO";
      listFrame.verticalPadding = 16;
      listFrame.horizontalPadding = 0;
      listFrame.itemSpacing = 8;
      coverFrame.appendChild(listFrame);
    }

    let createHeader = (name: string) => {
      let coverHead = figma.createText();
      coverHead.fontName = { family: "Inter", style: "Bold" };
      coverHead.characters = figma.root.name;
      coverHead.fontSize = 36;
      coverFrame.appendChild(coverHead);
    };

    let createPageItem = (name: string) => {
      let textFrame = figma.createText();
      textFrame.fontName = { family: "Inter", style: "Medium" };
      textFrame.characters = name;
      textFrame.fontSize = 20;
      listFrame.appendChild(textFrame);
    };

    let run = async pages => {
      createHeader("Project Name");

      pages.forEach(page => {
        createPageItem(page);
      });

      figma.closePlugin();
    };

    run(pages);

    figma.ui.postMessage({
      type: "table-created",
      message: `done`
    });
  }

  figma.closePlugin();
};
