#pragma strict

// Based on DragObject by Eric Haines < http://wiki.unity3d.com/index.php?title=DragObject >
// Adjusted to 2D environment by Meepu

// For London Is a Maze demo puzzle

// Drag and drop road pieces on the map

// Use on objects with
// isKinematic = false

private var myRigidbody : Rigidbody2D;
private var myTransform : Transform;
private var canMove = false;
private var cam : Camera;

function Start ()
{
	myRigidbody = GetComponent(Rigidbody2D);
	myTransform = GetComponent(Transform);
	cam = Camera.main;
}

function FixedUpdate ()
{
	if (!canMove) return;
	
	var mousePos = Input.mousePosition;
	var move = cam.ScreenToWorldPoint(Vector3(mousePos.x, mousePos.y, 1)) - myTransform.position;
 
	myRigidbody.transform.Translate(move);
	
}

function OnMouseDown ()
{
	canMove = true;
}

function OnMouseUp ()
{
	canMove = false;
}
