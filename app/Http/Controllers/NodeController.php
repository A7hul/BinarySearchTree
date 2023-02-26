<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Node;

class NodeController extends Controller
{
    public function index()
    {
        $nodes = Node::select('node_value')->get();
        return view('index', compact('nodes'));
    }

    public function store(Request $request)
    {
        $node = new Node();
        $node->node_value = $request->node_value;
        $node->save();
        return response()->json(['success' => true]);
    }

    public function destroy(Request $request)
    {
        $node = Node::where('node_value', $request->node_value)->first();
        if ($node) {
            $node->delete();
            return response()->json(['success' => true]);
        }
        return response()->json(['success' => false]);
    }
}
