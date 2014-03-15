#pragma strict

// Author: Meepu
// For London Is a Maze demo puzzle

// Check if road piece is correctly positioned

// Use on objects with 
// a collider with isTrigger = true
// a tag that corresponds to a road piece's tag

private var myTransform : Transform;

function Start () {
	myTransform = transform;
}

function Update () {

}

// Script runs when another game object with a collider enters the area
function OnTriggerStay2D (other : Collider2D) {

	// We're not interested unless player leaves the piece here
	if (Input.GetMouseButtonUp(0))
	{

		// Check that we have the correct object
		// (so we don't lock piece #7 to where piece #4 belongs)
		if (other.tag == myTransform.tag)
		{

			// Check if the object is in the middle of the target area
			// Because of floats, the comparison never returns true unless we round
			if((Mathf.Abs(other.transform.position.x - myTransform.position.x) < .2)
				&& (Mathf.Abs(other.transform.position.y - myTransform.position.y) < .2))
			//if (Mathf.Round(other.transform.position.x*10) == Mathf.Round(myTransform.position.x*10) 
			//	&& Mathf.Round(other.transform.position.y*10) == Mathf.Round(myTransform.position.y*10))
			{
				// Lock the object
				// When we destroy the collider, the object can no longer move
				Destroy(other.collider2D);
				
				// Change color to show player the position is correct
				//other.renderer.material.color = Color.green;

				var correctPieces = 0;
				
				var piecesToCheck = ["name1", "name2", "name3", "name4", "name5", 
					"occupation1", "occupation2", "occupation3", "occupation4", "occupation5", 
					"sherlock_ref1", "sherlock_ref2", "sherlock_ref3", "sherlock_ref4", "sherlock_ref5"];
					
				for (var pieceToCheck in piecesToCheck)
				{
					// Assuming there are exactly two objects tagged with "piece#"
					// One of them should be the road piece and one the target area
					var pieces = GameObject.FindGameObjectsWithTag(pieceToCheck);
					if (pieces[0] && pieces[1])
					{							
						if((Mathf.Abs(pieces[0].transform.position.x - pieces[1].transform.position.x) < .2)
						&& (Mathf.Abs(pieces[0].transform.position.y - pieces[1].transform.position.y) < .2))
						{
							correctPieces++;
							Debug.Log("pieces align");
							pieces[0].renderer.enabled = true;
							pieces[1].renderer.enabled = true;
						}
					}
					
				}
				
				if (correctPieces == 15)
					Debug.Log("SUCCESS!"); // todo: this should display a message box
				
			}
		}
	}
}
