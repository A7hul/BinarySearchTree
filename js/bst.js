"use strict";

class Node extends BaseNode {
  constructor(val) {
    super(val);
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.update_nodes = new Set();
  }

  find(x) {
    this.update_nodes = new Set();
    if (this.root === null) {
      return false;
    }
    let node = this.root;
    while (node.val !== x) {
      this.update_nodes.add(node);
      if (x < node.val) {
        if (node.left === null) break;
        node = node.left;
      } else {
        if (node.right === null) break;
        node = node.right;
      }
    }
    return (node.val === x);
  }
  find_l(x) {
    if (!this.find(x)) {
      return false;
    }
    this.update_nodes = new Set();
    let node = this.root;
    while (node.val !== x) {
      this.update_nodes.add(node);
      if (x < node.val) {
        if (node.left === null) break;
        node = node.left;
      } else {
        if (node.right === null) break;
        node = node.right;
      }
    }
    while (node.left !== null) {
      node = node.left;
    }
    return node.val;
  }
  find_r(x) {
    if (!this.find(x)) {
      return false;
    }
    this.update_nodes = new Set();
    let node = this.root;
    while (node.val !== x) {
      this.update_nodes.add(node);
      if (x < node.val) {
        if (node.left === null) break;
        node = node.left;
      } else {
        if (node.right === null) break;
        node = node.right;
      }
    }
    while (node.right !== null) {
      node = node.right;
    }
    return node.val;
  }
  remove(x) {
    this.update_nodes = new Set();
    let node = this.root;
    while (node !== null) {
      if (node.val === x) break;
      this.update_nodes.add(node);
      if (x < node.val) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    if (node === null) {
      return null;
    }

    const prt = node.prt;
    if (node.left === null || node.right === null) {
      const n_node = node.left || node.right;
      if (prt !== null) {
        if (x < prt.val) {
          prt.set_left(n_node);
        } else {
          prt.set_right(n_node);
        }
      } else {
        node.remove_child(n_node);
        this.root = n_node;
      }
    } else if (node.left !== null && node.right !== null) {
      let c_node = node.right;
      while (c_node.left !== null) {
        this.update_nodes.add(c_node);
        c_node = c_node.left;
      }
      this.update_nodes.add(c_node);
      const c_prt = c_node.prt;
      if (!node.is_right(c_node)) {
        c_prt.set_left(c_node.right);
        c_node.set_right(node.right);
      }
      if (prt !== null) {
        if (x < prt.val) {
          prt.set_left(c_node);
        } else {
          prt.set_right(c_node);
        }
      } else {
        node.remove_right();
        this.root = c_node;
      }
      c_node.set_left(node.left);
    }
    return node;
  }

  insert(x) {
    this.update_nodes = new Set();
    const new_node = new Node(x);
    let prv = null;
    if (this.root == null) {
      this.root = new_node;
      return new_node;
    }
    let node = this.root;
    while (node !== null) {
      if (node.val === x) {
        return null;
      }
      prv = node;
      this.update_nodes.add(node);
      if (x < node.val) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    if (prv !== null) {
      if (x < prv.val) {
        prv.set_left(new_node);
      } else {
        prv.set_right(new_node);
      }
    } else {
      this.root = new_node;
    }
    return new_node;
  }

  get_update_nodes() {
    return Array.from(this.update_nodes.values());
  }
}

window.onload = () => {
  const tree = new BinarySearchTree();

  const node_view = {}, node_map = {};
  let tl = null;

  const canvas = document.querySelector("svg.canvas");
  const nodes = document.querySelector(".nodes");
  const edges = document.querySelector(".edges");

  let delete_n_id = null;

  const add_node = (v, node) => {
    const n_id = node.id;
    nodes.appendChild(create_node(v, n_id));
    edges.appendChild(create_edge(v, n_id));
    const d_node = document.querySelector(`g.node${n_id}`);
    const d_edge = document.querySelector(`path.edge${n_id}`);

    node_view[v] = {
      "node": d_node,
      "edge": d_edge,
    };
    node_map[n_id] = node;
  };

  const change_canvas_size = (width, height) => {
    default_change_canvas_size(canvas, width, height);
  };

  const translate_obj = (result) => {
    default_translate_obj(node_map, result, tl);
  };

  const init_timeline = () => {
    if (delete_n_id !== null) {
      const n_id = delete_n_id;
      remove_node(n_id);
      remove_edge(n_id);
      delete_n_id = null;
    }
    if (tl !== null) {
      tl.seek(tl.duration);
    }
    tl = anime.timeline({
      duration: 1000,
    });
  };

  const find_l_r_tree_node = (v,direction) => {
    init_timeline();

    tl.add({
      duration: 500,
    });

    let max_depth = traverse(tree.root).depth;
    let end_node;
    const message = document.querySelector(".message");
    if(direction==='L'){
      end_node = tree.find_l(v);
      message.innerHTML = 'Left most node is ' + end_node + '.';

      const result_m = traverse(tree.root);
      translate_obj(result_m.ps);
      max_depth = Math.max(max_depth, result_m.depth);
    }else{
      end_node = tree.find_r(v);
      message.innerHTML = 'Right most node is ' + end_node + '.';

      const result_m = traverse(tree.root);
      translate_obj(result_m.ps);
      max_depth = Math.max(max_depth, result_m.depth);
    }

    const target_node = node_view[end_node].node;
    const update_nodes = tree.get_update_nodes().map(node => node_view[node.val].node);
    tl.changeBegin = () => {
      begin_change_color(target_node, update_nodes);
    };
    tl.changeComplete = () => {
      end_change_color(target_node, update_nodes);
    };
    const node_num = Object.keys(node_view).length;
    change_canvas_size(
      node_num * NODE_W + BASE_X * 2,
      (max_depth + 1) * NODE_H + BASE_Y * 2
    );
  };
  //remove tree node
  const remove_tree_node = (v) => {
    const node_num = Object.keys(node_view).length;

    init_timeline();

    tl.add({
      duration: 500,
    });

    const max_depth = traverse(tree.root).depth;

    let v_n_id = null;
    let target_node = null;
    const message = document.querySelector(".message");

    if (tree.find(v)) {
      const node = tree.remove(v);
      message.innerHTML = 'Node ' + v + ' Deleted.';

      target_node = node_view[v].node;
      v_n_id = node.id;

      hide_nodes(tl, [`g.node${v_n_id}`], [`path.edge${v_n_id}`]);

      const result = traverse(tree.root).ps;
      result[v_n_id] = [0, 0];
      translate_obj(result);

      delete node_view[v];
      delete node_map[v_n_id];
    } else {
      message.innerHTML = 'Node ' + v + ' not found.';

    }

    const update_nodes = tree.get_update_nodes().map(node => node_view[node.val].node);
    tl.changeBegin = () => {
      begin_change_color(target_node, update_nodes);
    };
    tl.changeComplete = () => {
      end_change_color(target_node, update_nodes);
    };
    delete_n_id = v_n_id;

    change_canvas_size(
      node_num * NODE_W + BASE_X * 2,
      (max_depth + 1) * NODE_H + BASE_Y * 2
    );
  };

  const add_tree_node = (v) => {
    init_timeline();

    tl.add({
      duration: 500,
    });

    let max_depth = traverse(tree.root).depth;

    const message = document.querySelector(".message");
    if (!tree.find(v)) {
      message.innerHTML = 'Added Node ' + v + '.';
      const node = tree.insert(v);

      add_node(v, node);

      const result_m = traverse(tree.root);
      translate_obj(result_m.ps);
      max_depth = Math.max(max_depth, result_m.depth);
    } else {
      message.innerHTML = 'Try another Node ' + v + ' found.';
    }

    const target_node = node_view[v].node;

    const update_nodes = tree.get_update_nodes().map(node => node_view[node.val].node);
    tl.changeBegin = () => {
      begin_change_color(target_node, update_nodes);
    };
    tl.changeComplete = () => {
      end_change_color(target_node, update_nodes);
    };
    const node_num = Object.keys(node_view).length;
    change_canvas_size(
      node_num * NODE_W + BASE_X * 2,
      (max_depth + 1) * NODE_H + BASE_Y * 2
    );
  };


  const find_tree_node = (v) => {
    init_timeline();

    tl.add({
      duration: 500,
    });

    let max_depth = traverse(tree.root).depth;

    const message = document.querySelector(".message");
    if (!tree.find(v)) {
      message.innerHTML = 'Node ' + v + ' not found.';
    } else {
      message.innerHTML = 'Node ' + v + ' found.';
      const target_node = node_view[v].node;

      const update_nodes = tree.get_update_nodes().map(node => node_view[node.val].node);
      tl.changeBegin = () => {
        begin_change_color(target_node, update_nodes);
      };
      tl.changeComplete = () => {
        end_change_color(target_node, update_nodes);
      };
      const node_num = Object.keys(node_view).length;
      change_canvas_size(
        node_num * NODE_W + BASE_X * 2,
        (max_depth + 1) * NODE_H + BASE_Y * 2
      );
    }
  };

  set_add_value(add_tree_node);
  set_remove_value(remove_tree_node);
  find_left_or_right_most_node(find_l_r_tree_node);
  find_node(find_tree_node);
};