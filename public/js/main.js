

Blockly.Blocks['variable'] = {
  /**
   * Block for advanced math operators with single operand.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "VAR",
          "options": [
            ['x', 'x'],
            ['y', 'y'],
            ['z', 'z'],
            ['a', 'a'],
            ['b', 'b'],
            ['c', 'c'],
            ['d', 'd'],
            ['e', 'e'],
            ['f', 'f'],
            ['g', 'g'],
            ['h', 'h'],
            ['i', 'i'],
            ['j', 'j'],
            ['k', 'k'],
            ['l', 'l'],
            ['m', 'm'],
            ['n', 'n'],
            ['o', 'o'],
            ['p', 'p'],
            ['q', 'q'],
            ['r', 'r'],
            ['s', 's'],
            ['t', 't'],
            ['u', 'u'],
            ['v', 'v'],
            ['w', 'w'],
          ]
        }
      ],
      "output": "Number",
      "colour": Blockly.Blocks.math.HUE,
    });
  }
};

Blockly.Python['variable'] = function(block) {
  // Math operators with single operand.
  var code = block.getFieldValue('VAR');

  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['differential'] = {
  init: function() {
    this.appendValueInput("NUM")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput("x"), "VAR")
        .appendField("で微分");
    this.setColour(230);
    this.setOutput(true, null);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['differential'] = function(block) {
  let variable = block.getFieldValue('VAR');
  let num = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_NONE) || '0';
  let code = "d(" + num + ")/d" + variable
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['integral'] = {
  init: function() {
    this.appendValueInput("NUM")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput("x"), "VAR")
        .appendField("で積分");
    this.setColour(230);
    this.setOutput(true, null);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['integral'] = function(block) {
  let variable = block.getFieldValue('VAR');
  let num = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_NONE) || '0';
  let code = "int[" + num + "," + variable + "]"
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Blocks['definite_integral'] = {
  init: function() {
     this.appendValueInput("FROM")
         .setCheck(null);
     this.appendValueInput("TO")
         .setCheck(null)
         .appendField("から");
     this.appendValueInput("NUM")
         .setCheck(null)
         .appendField("まで")
         .appendField(new Blockly.FieldTextInput("x"), "VAR")
         .appendField("で積分");
     this.setInputsInline(true);
     this.setOutput(true, null);
     this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
   }
};

Blockly.Python['definite_integral'] = function(block) {
  let variable = block.getFieldValue('VAR');
  let from = Blockly.Python.valueToCode(block, 'FROM', Blockly.Python.ORDER_NONE) || '0';
  let to = Blockly.Python.valueToCode(block, 'TO', Blockly.Python.ORDER_NONE) || '0';
  let num = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_NONE) || '0';
  let code = "int_{" + from + "}^{" + to + "}[(" + num + ")d" + variable + "]"
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['multi_differential'] = {
  init: function() {
    this.appendValueInput("NUM")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput("x"), "VAR")
        .appendField("で")
        .appendField(new Blockly.FieldTextInput("2"), "COUNT")
        .setCheck("Number")
        .appendField("階微分");

    this.setColour(230);
    this.setOutput(true, null);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['multi_differential'] = function(block) {
  let variable = block.getFieldValue('VAR');
  let count = block.getFieldValue('COUNT');
  let num = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_NONE) || '0';
  let code = "D[" + num + ",{" + variable + "," + count + "}]"
  return [code, Blockly.Python.ORDER_NONE];
};




Blockly.Blocks['solve'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.itemCount_ = 1;
    this.updateShape_();
    this.setOutput(true, 'Array');
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH);
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  }
};


Blockly.Python['solve'] = function(block) {
  // Create a list with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Python.valueToCode(block, 'ADD' + i,
        Blockly.Python.ORDER_NONE) || 'None';
  }
  var code = 'solve[' + elements.join(', ') + ']';
  return [code, Blockly.Python.ORDER_ATOMIC];
};




(function() {


  let blocklyArea = document.getElementById('blocklyArea');
  let blocklyDiv = document.getElementById('blocklyDiv');
  let workspace = Blockly.inject(blocklyDiv,
      {media: 'js/media/',
       toolbox: document.getElementById('toolbox'),
        lang: "ja"});
  let onresize = function(e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    let element = blocklyArea;
    let x = 0;
    let y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  };
  window.addEventListener('resize', onresize, false);
  onresize();
  Blockly.svgResize(workspace);

  let dialog = document.querySelector('dialog');
  if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }

  $(function() {
      $("#run").click(function() {
        dialog.showModal();
        $("#result-spinner").show();
        $(".result-image").remove()

        let code = Blockly.Python.workspaceToCode(workspace);
        code = code.replace(/\n/g, "");
        console.log(code)
        $.ajax({
          method: "GET",
          url: "calculate",
          dataType:'xml',
          data: {
            code: code
          }
        }).done(function(xml) {
          console.log("Done", xml)
          showAnswer(xml)
        }).fail(function(xml) {
          console.log("Failed", xml)
        })
      })
  })

  function showAnswer(xml) {
    let imgs = [];

    let pods = xml.getElementsByTagName("pod")
    for (let pod of pods) {
      let title = pod.getAttribute("title")
      if (title != "Input" && title != "Input interpretation" ) {

        if (title == "Results" || title == "Differential equation solution" || title=="Real solutions") {
            imgs = []
        }
        if (!imgs.length) {
          let subpods = pod.querySelectorAll("subpod");
          for (let subpod of subpods) {
            imgs.push(subpod.querySelector("img"))
          }
        }
      }
      console.log(pod)
    }


    for (let img of imgs) {
      let div = $("<div>").addClass("result-image")
        .appendTo("#result-content")
        .css("width", "100%")
        .css("display", "flex")
        .css("justify-content", "center")

      let imgRef = $("<img>").attr("src", img.getAttribute("src"))
        .appendTo(div)


    }


    $("#result-spinner").hide();

  }

  $(".close").click(function() {
    dialog.close()
  })
})()
